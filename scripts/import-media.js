'use strict';

const fs = require('fs-extra');
const path = require('path');
const mime = require('mime-types');

/**
 * Import media files from a local directory to Strapi Media Library
 * Usage: node scripts/import-media.js [source-directory]
 * Default source: ../src/media
 */
function getFileSizeInBytes(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

function getFileData(fileName, sourceDir) {
  const filePath = path.join(sourceDir, fileName);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  const size = getFileSizeInBytes(filePath);
  const ext = fileName.split('.').pop();
  const mimeType = mime.lookup(ext || '') || 'application/octet-stream';

  return {
    filepath: filePath,
    originalFileName: fileName,
    size,
    mimetype: mimeType,
  };
}

async function uploadFileToStrapi(fileData, name) {
  return strapi
    .plugin('upload')
    .service('upload')
    .upload({
      files: fileData,
      data: {
        fileInfo: {
          alternativeText: name,
          caption: name,
          name: name,
        },
      },
    });
}

async function checkFileExists(fileName) {
  const nameWithoutExt = fileName.replace(/\..*$/, '');
  return await strapi.query('plugin::upload.file').findOne({
    where: {
      name: nameWithoutExt,
    },
  });
}

async function importMediaFiles(sourceDir) {
  if (!fs.existsSync(sourceDir)) {
    console.log(`❌ Directory not found: ${sourceDir}`);
    console.log(`💡 Create the directory and add your media files there.`);
    return;
  }

  const files = fs.readdirSync(sourceDir).filter((file) => {
    const filePath = path.join(sourceDir, file);
    return fs.statSync(filePath).isFile();
  });

  if (files.length === 0) {
    console.log(`📁 No files found in: ${sourceDir}`);
    return;
  }

  console.log(`\n📦 Found ${files.length} file(s) to import...\n`);

  let uploaded = 0;
  let skipped = 0;
  let errors = 0;

  for (const fileName of files) {
    const filePath = path.join(sourceDir, fileName);
    const nameWithoutExt = path.basename(fileName, path.extname(fileName));

    try {
      // Check if file already exists
      const existing = await checkFileExists(fileName);
      if (existing) {
        console.log(`⏭️  Skipped: ${fileName} (already exists)`);
        skipped++;
        continue;
      }

      // Upload file
      console.log(`⬆️  Uploading: ${fileName}...`);
      const fileData = getFileData(fileName, sourceDir);
      const [uploadedFile] = await uploadFileToStrapi(fileData, nameWithoutExt);
      console.log(`✅ Uploaded: ${fileName} (ID: ${uploadedFile.id})`);
      uploaded++;
    } catch (error) {
      console.error(`❌ Error uploading ${fileName}:`, error.message);
      errors++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Uploaded: ${uploaded}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log(`\n🎉 Done! Check your Media Library in the Strapi admin panel.\n`);
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  // Get source directory from command line or use default
  // Structure: project-root/src/media, and script is at project-root/skipaman/scripts/import-media.js
  // __dirname = skipaman/scripts, so .. = skipaman, .. = project root
  const projectRoot = path.join(__dirname, '..', '..');
  const defaultSourceDir = path.join(projectRoot, 'src', 'media');
  const sourceDir = process.argv[2] || defaultSourceDir;
  const absoluteSourceDir = path.isAbsolute(sourceDir) 
    ? sourceDir 
    : path.resolve(projectRoot, sourceDir);

  console.log(`🚀 Starting media import...`);
  console.log(`📂 Source directory: ${absoluteSourceDir}\n`);

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  try {
    await importMediaFiles(absoluteSourceDir);
  } catch (error) {
    console.error('❌ Fatal error:', error);
  }

  await app.destroy();
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

