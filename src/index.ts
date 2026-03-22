import express from "express";
import mongoose from "mongoose";
import { random } from "./utils.js"
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel, LinkModel } from "./db.js";

import { JWT_PASSWORD } from "./config.js"
import { userMiddleware } from "./middleware.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb_connection_url");

app.post("/api/v1/signup", async (req, res) => {
      //TODO: Zod validation, hash the password
      const username = req.body.username;
      const password = req.body.password;
  
   try {
        await UserModel.create({
        username: username,
        password: password
        
     })

     res.json({
        message: "User Signed Up"
     })
   } catch (e) {
      res.status(411).json({
        message: "User already exists"
      })
   }
      
})

app.post("/api/v1/signin", async (req, res) => {
     
     const username = req.body.username;
     const password = req.body.password;

     const existingUser = await UserModel.findOne({
        username, 
        password
     })

     if (existingUser) {
        const token = jwt.sign({
          id: existingUser._id,
        }, JWT_PASSWORD)
        
         res.json({
            token
        })
     } else {
        res.status(403).send({
            message: "Incorrect Credentials"
        })  
     }

})

app.post("/api/v1/content", userMiddleware, async (req, res) => {
       
    const link = req.body.link;
    const type = req.body.type;

    await ContentModel.create({
        link,
        type,
        userId: req.userId,
        tags: []
    })
    
    res.json({
        message: "Content added"
    })
})

app.get("/api/v1/content", userMiddleware, async(req, res) => { 

    const userId = req.userId
    const content = await ContentModel.find({
        userId: req.userId!
    }).populate("userId", "username")
    res.json({
        content
    })

})

app.delete("/api/v1/content", userMiddleware, async(req, res) => {
        
     const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        _id: contentId,
        userId: req.userId!
     }) 
     res.json({
        message: "Deleted"
     })
})

app.post("/api/v1/brain/share", async (req, res) => {
  if (!req.userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const { share } = req.body;

  if (share) {
    const existingLink = await LinkModel.findOne({
      userId: req.userId,
    });

    if (existingLink) {
      return res.json({
        hash: existingLink.hash,
      });
    }

    const hash = nanoid(10);

    await LinkModel.create({
      userId: req.userId,
      hash,
    });

    return res.json({ hash });
  } else {
    await LinkModel.deleteOne({
      userId: req.userId,
    });

    return res.json({
      message: "Removed link",
    });
  }

})


app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({ hash });

  if (!link) {
    return res.status(411).json({
      message: "Sorry incorrect input",
    });
  }

  const content = await ContentModel.find({
    userId: link.userId,
  });

  const user = await UserModel.findOne({
    _id: link.userId,
  });

  if (!user) {
    return res.status(411).json({
      message: "User not found (should not happen)",
    });
  }

  return res.json({
    username: user.username,
    content,
  });

})

app.listen(3000);