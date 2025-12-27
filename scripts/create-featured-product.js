'use strict';

/**
 * Script to create a featured product in Strapi
 * Run this while Strapi is running: node scripts/create-featured-product.js
 */

const { createStrapi, compileStrapi } = require('@strapi/strapi');

async function createFeaturedProduct() {
  console.log('🚀 Creating featured product in Strapi...\n');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  try {
    // Check if product already exists
    const existing = await app.documents('api::product.product').findMany({
      filters: { slug: 'featured-product-demo' },
    });

    if (existing.length > 0) {
      console.log('✅ Featured product already exists!');
      console.log(`   Product ID: ${existing[0].id}`);
      console.log(`   Title: ${existing[0].title}`);
      console.log(`   Featured: ${existing[0].featured}`);
      await app.destroy();
      process.exit(0);
    }

    // Create a new featured product
    const product = await app.documents('api::product.product').create({
      data: {
        title: 'Featured Product Demo',
        slug: 'featured-product-demo',
        price: 49.99,
        description: 'This is a featured product created automatically. It demonstrates the featured flag functionality.',
        featured: true,
        publishedAt: new Date(),
      },
    });

    console.log('✅ Featured product created successfully!');
    console.log(`   Product ID: ${product.id}`);
    console.log(`   Title: ${product.title}`);
    console.log(`   Slug: ${product.slug}`);
    console.log(`   Price: $${product.price}`);
    console.log(`   Featured: ${product.featured}`);
    console.log(`   Published: ${product.publishedAt ? 'Yes' : 'No'}`);
    console.log('\n💡 You can now refresh your React app to see this product!');
  } catch (error) {
    console.error('❌ Error creating product:', error.message);
    if (error.details) {
      console.error('   Details:', error.details);
    }
  } finally {
    await app.destroy();
    process.exit(0);
  }
}

createFeaturedProduct().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});


