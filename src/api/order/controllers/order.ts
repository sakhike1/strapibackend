/**
 * order controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body;

    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Set order date
    const placedAt = new Date().toISOString();

    // Create order with generated order number
    const orderData = {
      ...data,
      orderNumber,
      placedAt: data.placedAt || placedAt,
      orderStatus: 'confirmed', // Automatically confirm the order
    };

    // Create the order
    const response = await super.create(ctx);

    // Send order confirmation email
    try {
      const order = response.data;
      
      await strapi.plugins['email'].services.email.send({
        to: order.attributes.customerEmail,
        subject: `Order Confirmation - ${order.attributes.orderNumber}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Confirmation</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
              }
              .container {
                background-color: #ffffff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              .header {
                text-align: center;
                border-bottom: 3px solid #dc2626;
                padding-bottom: 20px;
                margin-bottom: 30px;
              }
              .header h1 {
                color: #dc2626;
                margin: 0;
                font-size: 28px;
              }
              .order-info {
                background-color: #f9fafb;
                padding: 20px;
                border-radius: 5px;
                margin: 20px 0;
              }
              .order-info h2 {
                color: #1f2937;
                margin-top: 0;
                font-size: 20px;
              }
              .info-row {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: 1px solid #e5e7eb;
              }
              .info-row:last-child {
                border-bottom: none;
              }
              .info-label {
                font-weight: bold;
                color: #6b7280;
              }
              .info-value {
                color: #1f2937;
              }
              .items-section {
                margin: 30px 0;
              }
              .items-table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
              }
              .items-table th {
                background-color: #dc2626;
                color: white;
                padding: 12px;
                text-align: left;
                font-weight: bold;
              }
              .items-table td {
                padding: 12px;
                border-bottom: 1px solid #e5e7eb;
              }
              .items-table tr:last-child td {
                border-bottom: none;
              }
              .total-section {
                background-color: #fef2f2;
                padding: 20px;
                border-radius: 5px;
                margin: 20px 0;
                border-left: 4px solid #dc2626;
              }
              .total-row {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                font-size: 16px;
              }
              .total-final {
                font-size: 20px;
                font-weight: bold;
                color: #dc2626;
                border-top: 2px solid #dc2626;
                padding-top: 10px;
                margin-top: 10px;
              }
              .message {
                background-color: #dbeafe;
                border-left: 4px solid #3b82f6;
                padding: 15px;
                margin: 20px 0;
                border-radius: 5px;
              }
              .message p {
                margin: 0;
                color: #1e40af;
                font-weight: 500;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Order Confirmed!</h1>
              </div>
              
              <div class="message">
                <p>✓ Thank you for your order! We have received your order and will update you regarding delivery.</p>
              </div>

              <div class="order-info">
                <h2>Order Details</h2>
                <div class="info-row">
                  <span class="info-label">Order Number:</span>
                  <span class="info-value">${order.attributes.orderNumber}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Order Date:</span>
                  <span class="info-value">${new Date(order.attributes.placedAt).toLocaleDateString('en-ZA', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Status:</span>
                  <span class="info-value">${order.attributes.orderStatus.charAt(0).toUpperCase() + order.attributes.orderStatus.slice(1)}</span>
                </div>
              </div>

              <div class="order-info">
                <h2>Customer Information</h2>
                <div class="info-row">
                  <span class="info-label">Name:</span>
                  <span class="info-value">${order.attributes.customerName}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Email:</span>
                  <span class="info-value">${order.attributes.customerEmail}</span>
                </div>
                ${order.attributes.customerPhone ? `
                <div class="info-row">
                  <span class="info-label">Phone:</span>
                  <span class="info-value">${order.attributes.customerPhone}</span>
                </div>
                ` : ''}
              </div>

              ${order.attributes.items && Array.isArray(order.attributes.items) && order.attributes.items.length > 0 ? `
              <div class="items-section">
                <h2 style="color: #1f2937; margin-bottom: 15px;">Order Items</h2>
                <table class="items-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${order.attributes.items.map((item: any) => `
                      <tr>
                        <td>${item.name || 'Product'}</td>
                        <td>${item.quantity || 1}</td>
                        <td>R ${parseFloat(item.price || 0).toFixed(2)}</td>
                        <td>R ${(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(2)}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
              ` : ''}

              <div class="total-section">
                <div class="total-row">
                  <span>Subtotal:</span>
                  <span>R ${parseFloat(order.attributes.subtotal || 0).toFixed(2)}</span>
                </div>
                ${parseFloat(order.attributes.shippingCost || 0) > 0 ? `
                <div class="total-row">
                  <span>Shipping:</span>
                  <span>R ${parseFloat(order.attributes.shippingCost || 0).toFixed(2)}</span>
                </div>
                ` : ''}
                ${parseFloat(order.attributes.tax || 0) > 0 ? `
                <div class="total-row">
                  <span>Tax:</span>
                  <span>R ${parseFloat(order.attributes.tax || 0).toFixed(2)}</span>
                </div>
                ` : ''}
                <div class="total-row total-final">
                  <span>Total:</span>
                  <span>R ${parseFloat(order.attributes.total || 0).toFixed(2)}</span>
                </div>
              </div>

              ${order.attributes.shippingAddress ? `
              <div class="order-info">
                <h2>Shipping Address</h2>
                <p style="margin: 0; color: #1f2937;">
                  ${typeof order.attributes.shippingAddress === 'string' 
                    ? order.attributes.shippingAddress 
                    : Object.values(order.attributes.shippingAddress).filter(v => v).join(', ')}
                </p>
              </div>
              ` : ''}

              <div class="message" style="background-color: #fef3c7; border-left-color: #f59e0b;">
                <p style="color: #92400e;">
                  <strong>What's Next?</strong><br>
                  We will process your order and send you updates regarding delivery. You will receive an email notification once your order has been shipped.
                </p>
              </div>

              <div class="footer">
                <p>Thank you for shopping with us!</p>
                <p>If you have any questions, please contact our support team.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
Order Confirmation - ${order.attributes.orderNumber}

Thank you for your order! We have received your order and will update you regarding delivery.

Order Details:
- Order Number: ${order.attributes.orderNumber}
- Order Date: ${new Date(order.attributes.placedAt).toLocaleDateString('en-ZA')}
- Status: ${order.attributes.orderStatus.charAt(0).toUpperCase() + order.attributes.orderStatus.slice(1)}

Customer Information:
- Name: ${order.attributes.customerName}
- Email: ${order.attributes.customerEmail}
${order.attributes.customerPhone ? `- Phone: ${order.attributes.customerPhone}` : ''}

Total: R ${parseFloat(order.attributes.total || 0).toFixed(2)}

We will process your order and send you updates regarding delivery. You will receive an email notification once your order has been shipped.

Thank you for shopping with us!
        `,
      });
    } catch (error) {
      // Log error but don't fail the order creation
      console.error('Failed to send order confirmation email:', error);
      strapi.log.error('Order confirmation email failed:', error);
    }

    // Return response with confirmation message
    return {
      ...response,
      meta: {
        message: 'Order confirmed! We will update you regarding delivery.',
        orderNumber: response.data.attributes.orderNumber,
      },
    };
  },
}));

