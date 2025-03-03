<template>
    <div class="pc-product-card">
      <!-- Image of the product (passo3.png) -->
      <div class="image-container">
        <img src="@/assets/passo3.png" alt="PC Product Image" class="pc-image" />
      </div>
  
      <!-- Labels for the product name and description -->
      <div class="pc-product-info text-center mt-2">
        <p class="product-name text-lg font-semibold">Placeholder Name</p>
        <p class="product-description text-sm text-gray-600">Placeholder Description</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "PcProductCard"
  };
  </script>
  
  <style scoped>
  .pc-product-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 250px;
    border-radius: 8px;
    padding: 10px;
    background-color: #fff;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .image-container {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .pc-image {
    width: auto;
    height: 100%;
    max-height: 100px;
  }
  
  .pc-product-info {
    margin-top: 8px;
  }
  
  .product-name {
    font-weight: bold;
  }
  
  .product-description {
    color: #777;
  }
  
  .pc-product-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  </style>
  