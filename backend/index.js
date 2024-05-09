// 13 APRIL 2024

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const port = 4000;
// const loginModel = require('../backend/models/login')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser =require('cookie-parser');
const path = require('path');
const multer = require('multer');
const categoryModel =require("../backend/models/category")
const chefModel =require("../backend/models/chef")
const reviewModel = require('../backend/models/review')
const foodModel = require('../backend/models/food')
const orderModel = require ('../backend/models/order')
const paymentModel =require('../backend/models/payment')
const User = require('../backend/models/user')

const Cart = require('../backend/models/order')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/FOOD')
.then(()=>{
    console.log('mongoose is connected');
})
.catch((err)=>{
    console.log(err);
    
})



/////////////////LOGIN///////////


//////////////////////////////New code for Login Signin
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
 
  try {
    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
 
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
 
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save(); // Use await to ensure user is saved
    res.send('User registered successfully');
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// User login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
 
  try {
    const user = await User.findOne({ email });
 
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
 
      if (isPasswordValid) {
        const userResponse = {
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          _id: user._id
        };
        res.json(userResponse);
      } else {
        return res.status(400).json({ error: 'Incorrect password' });
      }
    } else {
      return res.status(400).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// app.get('/getallusers', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.send(users);
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// });


app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = {
      name: user.name,
      email: user.email
    };

    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  ////////////////////Category/////////////////////////////////////////////

  app.get('/categoryName', async (req, res) => {
    try {
      const categories = await categoryModel.find({}, 'category'); // Retrieve only the department field
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/category', upload.single('image'), async (req, res) => {
    try {
      const { name,category } = req.body;
      const imagePath = req.file.path;
      const newCategory = await categoryModel.create({
        name,
        
        image: `/images/${path.basename(imagePath)}`, // Save the image path relative to the public/images directory
        category
      });
  
      res.status(201).json({ category: newCategory });
      console.log(newCategory);
  
    } catch (err) {
      res.status(500).json({ error: err.message });
      console.log(err);
    }
  });



  app.get('/getCategory', async (req, res) => {
    try {
      const categories = await categoryModel.find();
      res.json({ categories });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.delete("/deleteCategory/:id", (req, res) => {
    const { id } = req.params;
    categoryModel.findByIdAndDelete({ _id: id })
      .then((de) => {
        console.log(de);
        res.json(de)
      })
      .catch((err) => {
        console.log(err);
      })
  })

  app.get("/getProductCategory/:id", async (req, res) => {
    const { id } = req.params;
    await categoryModel.findById(id) // Assuming Department is your Mongoose model
      .then((category) => {
        res.json(category);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });

  app.put("/updateCategory/:id", upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name,category } = req.body;
    let image = req.file ? `/images/${req.file.filename}` : null; // Update the image path if a new image is uploaded
    try {
      const updatedCategory = await categoryModel.findByIdAndUpdate(id, { category, name, image }, { new: true });
      res.json(updatedCategory);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// ////////////////////////////////CHEF/////////////////////////
app.get('/chefName', async (req, res) => {
  try {
    const chefs = await chefModel.find({}, 'chef'); // Retrieve only the department field
    res.json(chefs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/chef', upload.single('image'), async (req, res) => {
  try {
    const {chefname ,description} = req.body;
    const imagePath = req.file.path;
    const newChef = await chefModel.create({
      chefname,
      
      image: `/images/${path.basename(imagePath)}`, 
      description
    });

    res.status(201).json({ chef: newChef });
    console.log(newChef);

  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
});



app.get('/getChef', async (req, res) => {
  try {
    const chefs = await chefModel.find();
    res.json({ chefs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/deleteChef/:id", (req, res) => {
  const { id } = req.params;
  chefModel.findByIdAndDelete({ _id: id })
    .then((de) => {
      console.log(de);
      res.json(de)
    })
    .catch((err) => {
      console.log(err);
    })
})

app.get("/getUserChef/:id", async (req, res) => {
  const { id } = req.params;
  await chefModel.findById(id) // Assuming Department is your Mongoose model
    .then((chef) => {
      res.json(chef);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.put("/updateChef/:id", upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { chefname,description } = req.body;
  let image = req.file ? `/images/${req.file.filename}` : null; // Update the image path if a new image is uploaded
  try {
    const updatedChef = await chefModel.findByIdAndUpdate(id, { chefname,image,description }, { new: true });
    res.json(updatedChef);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
////////////////////////////FOOD////////////////////////////////




app.get('/foodName', async (req, res) => {
  try {
    const foods = await foodModel.find({}, 'foodname'); // Retrieve only the department field
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/food', upload.single('image'), async (req, res) => {
  try {
    const { foodname,description,price,category } = req.body;
    const imagePath = req.file.path;
    const newFood = await foodModel.create({
      foodname,
      description,
      image: `/images/${path.basename(imagePath)}`, // Save the image path relative to the public/images directory
      price,
      category
    });

    res.status(201).json({ food: newFood });
    console.log(newFood);

  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
});



app.get('/getFood', async (req, res) => {
  try {
    const foods = await foodModel.find();
    res.json({ foods });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/deleteFood/:id", (req, res) => {
  const { id } = req.params;
  foodModel.findByIdAndDelete({ _id: id })
    .then((de) => {
      console.log(de);
      res.json(de)
    })
    .catch((err) => {
      console.log(err);
    })
})

app.get("/getUserFood/:id", async (req, res) => {
  const { id } = req.params;
  await foodModel.findById(id) // Assuming Department is your Mongoose model
    .then((food) => {
      res.json(food);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.put("/updateFood/:id", upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { foodname,description,price,category } = req.body;
  let image = req.file ? `/images/${req.file.filename}` : null; // Update the image path if a new image is uploaded
  try {
    const updatedFood = await foodModel.findByIdAndUpdate(id, { foodname,description, image,price,category }, { new: true });
    res.json(updatedFood);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

///////////////////////////////REVIEW/////////////////////////////
app.get('/reviewName', async (req, res) => {
  try {
    const reviews = await reviewModel.find({}, 'review'); // Retrieve only the department field
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/review', upload.single('image'), async (req, res) => {
  try {
    const {customer ,description} = req.body;
    const imagePath = req.file.path;
    const newCustomer = await reviewModel.create({
      customer,
      
      image: `/images/${path.basename(imagePath)}`, 
      description
    });

    res.status(201).json({ customer : newCustomer });
    console.log(newCustomer);

  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
});

app.get('/getReview', async (req, res) => {
  try {
    const reviews = await reviewModel.find();
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//////////////////////////ORDERS/////////////////////////


// Fetch all orders
app.get('/admin/orders', async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// Assuming you have a route to handle fetching orders in your Express app
app.get('/admin/orders', async (req, res) => {
  try {
    // Assuming orderModel contains the necessary food details
    const orders = await orderModel.find().populate('items.foodName');
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// Update order status by ID
app.put('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // You can implement notifications here

    res.json({ success: true, updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.get('/getOrdersByUser/:id', async (req, res) => {
  try {
    const id = req.params.id
    const orders = await orderModel.find({ id }); // Retrieve orders by user ID
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
///////////////////////////////////////////////////////////////////

app.post('/payment', async (req, res) => {
  try {
    const { name, address, total, place } = req.body;
    const newPayment = await paymentModel.create({
      name,
      address,
      total,
      place,
    });

    res.status(201).json({ payment: newPayment });
    console.log(newPayment);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
});


app.get('/paymentdetails',async(req,res)=>{
  try{
    const payments = await paymentModel.find()
    res.json({payments});
  } catch (error){
    res.status(500).json({ error: error.message });
  }
})
// /////////////////////////////////////

app.post('/api/order', async (req, res) => {
  try {
    const { userId, foodItems, totalPrice } = req.body;
    
    // Save the order details to the database, along with the current date
    const order = new orderModel({
      userId,
      foodItems,
      totalPrice,
      orderDate: new Date() // Add order date
    });

    await order.save();

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error confirming order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to fetch order history for a specific user
// API endpoint to fetch order history for a specific user
app.get('/api/order/history/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Fetch order history for the given user ID
    const orderHistory = await orderModel.find({ userId }).select('-_id foodItems totalPrice orderDate');

    res.status(200).json({ orders: orderHistory });
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
////////////////////////////////////////////////


let selectedFood = [];

app.post('/api/selectedFood', (req, res) => {
  const { foodItems } = req.body;
  selectedFood = foodItems; // Update selectedFood with new food items
  res.status(200).send('Selected food items added successfully.');
});

app.get('/api/selectedFood', (req, res) => {
  res.json(selectedFood);
});
////////////////////////////////////////////////
app.post('/addToCart', async (req, res) => {
  try {
      const { userId, foodname, image, category, description, price } = req.body;
      const cartItem = new Cart({ userId, foodname, image, category, description, price });
      await cartItem.save();
      res.status(201).json({ message: 'Item added to cart successfully' });
  } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ message: 'Failed to add item to cart' });
  }
});




app.get('/cartData', async (req, res) => {
  try {
      const cartData = await Cart.find();
      res.json(cartData);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});



app.delete('/deleteCartItem/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    // Find the cart item by ID and delete it
    const deletedItem = await Cart.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.status(200).json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.get('/trackOrder/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    // Fetch order details from the database based on the orderId
    const order = await Cart.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    // Return the current status of the order
    res.status(200).json({ status: order.status });
  } catch (error) {
    console.error("Error tracking order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put('/updateOrderStatus/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;

    // Update order status in the database
    await Cart.findByIdAndUpdate(orderId, { status });

    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Express route for fetching order history
app.get('/orderHistory', async (req, res) => {
  try {
    const orderHistory = await Cart.find();
    res.status(200).json(orderHistory);
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//////////////////////////////////////

app.listen(port,()=>{
    console.log(`server is connected to ${port}`);
})






