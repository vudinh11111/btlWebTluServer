Có gì thắc mắc liên hệ Vũ sđt:03940256**
 
[Run]:
npm install
npm start

- Express.js
- Node.js
- MongoDB
- Mongoose
  - [Auth]
    - Login: `[POST] - /api/auth/login` 
    - Signup: `[POST] - /api/auth/signup`
  - [Categories]
    - `[GET, POST] - /api/categories`
    - `[GET] - /api/categories/:categoryId`
    - 
  - [Products]
    - `[GET] - /api/products`
    - `[GET] - /api/products/:productsId`
  - [Users]
    - Cart
      - `[GET, POST] - /api/users/cart/`
      - `[POST, DELETE] - /api/users/cart/:productId`
      - `[GET] - /api/users/cart/clear`
    - Wishlist
      - `[GET, POST] - /api/users/wishlist`
      - `[DELETE] - /api/users/wishlist/:productId`
    - Address
      - `[GET, POST] - /api/users/addresses`
      - `[POST, DELETE] - /api/users/addresses/:addressId`
    - Orders
      - `[GET, POST] - /api/users/orders`
  
