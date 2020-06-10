const express = require("express");
const router = express.Router();
const app = express();
const User = require("../../models/User.js");
const Character = require("../../models/Character.js");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const nodemailer = require("nodemailer");
const randomToken = require("random-token");

router.get("/profile", async (req, res) => {
  const users = await User.query().select("username", "email").where("id", req.session.userID);
  const user = users[0];
  res.json(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const users = await User.query().select().where({ email: email }).limit(1);
    const user = users[0];

    if (!user) {
      return res.status(404).send({ status: 0, message: "Wrong email" });
    }

    bcrypt.compare(password, user.password, (error, isSame) => {
      if (error) {
        return res
          .status(500)
          .send({ status: 0, message: "Found user but there was an error" });
      }
      if (!isSame) {
        return res.status(404).send({ status: 0, message: "The password was incorrect" });
      } else {
        req.session.userID = user.id;
        req.session.email = email;
        req.session.username = user.userName;
        console.log(req.session);
        return res.status(200).send({
          status: 1, message: "Successful"
        });
      }
    });
  } else {
    return res.status(404).send({ status: 0, message: "Missing email or password" });
  }
});

router.post("/session", (req, res) => {
  if (!req.session.userID) return res.status(200).send({ status: 0, message: "Not logged in" })

  return res.status(200).send(
    {
      status: 1,
      message: "Logged in",
      user: {
        userID: req.session.id,
        username: req.session.username,
        email: req.session.email,
      }
    }
  )
})

router.put("/update-user", async (req, res) => {
  const { username, email, newPassword, repeatNewPassword } = req.body;

  try {
    if (newPassword === repeatNewPassword) {
      if (newPassword.length < 3) {
        return res
          .status(400)
          .send({ status: 0, message: "Password does not fulfill the requirements" });
      } else {
        bcrypt.hash(newPassword, saltRounds, async (error, hashedPassword) => {
          if (newPassword === repeatNewPassword) {
            const updatedUser = await User.query().where("id", req.session.userID).limit(1).patch({
              username,
              email,
              password: hashedPassword
            })
            return res.status(200).send({ status: 1, message: "User updated, success" });
          }
          if (error) {
            return res.status(500).send({});
          } else if (newPassword !== repeatNewPassword) {
            return res.status(404).send({
              status: 0, message: "Password and repeat password are not the same"
            });
          } else {
            return res.status(404).send({ status: 0, message: "Missing fields" });
          }
        });
      }
    }
  } catch (err) {
    return res.status(404).send({ status: 0, message: "Something went wrong with the database" });
  }

})

router.post("/logout", (req, res) => {
  req.session.destroy()
  return res.status(200).send({ status: 0, message: "You're logged out" })
});

router.post("/register", (req, res) => {
  const { username, email, password, repeatPassword } = req.body;

  console.log(req.body);

  if (email && password && repeatPassword && password === repeatPassword) {
    if (password.length < 3) {
      return res
        .status(400)
        .send({ status: 0, message: "Password does not fulfill the requirements" });
    } else {
      bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
        if (error) {
          return res.status(500).send({ status: 0, message: "Couldnt register" });
        }
        try {
          const existingUser = await User.query()
            .select()
            .where({ email: email })
            .limit(1);

          if (existingUser[0]) {

            return res.status(404).send({ status: 0, message: "User already exists" });
          } else {
            const newUser = await User.query().insert({
              username,
              email,
              password: hashedPassword
            });

            return res.status(200).send({ status: 1, message: "Sign up successfull" });
          }
        } catch (error) {
          return res
            .status(500)
            .send({ status: 0, message: "Something went wrong with the database" });
        }
      });
    }
  } else if (password !== repeatPassword) {
    return res
      .status(404)
      .send({ status: 0, message: "Password and repeat password are not the same" });
  } else {
    return res.status(404).send({ status: 0, message: "Missing fields" });
  }
});

router.post("/reset-password", async (req, res) => {
  const { email } = req.body;
  const token = randomToken(5);
  app.locals.token = token;
  app.locals.email = email;

  try {
    const users = await User.query()
      .select()
      .where({ email: app.locals.email })
      .limit(1);
    const user = users[0];
    if (user) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "elitest321@gmail.com",
          pass: "Kodenertest"
        }
      });
      const mailOptions = {
        from: "Reset Password",
        to: app.locals.email,
        subject: "Reset",
        text: "This is your token: " + app.locals.token,
        replyTo: "elias.lip96@gmail.com"
      };

      transporter.sendMail(mailOptions, function (err, res) {
        if (err) {
          console.error("there was an error: ", err);
        } else {
          console.log("here is the res: ", res);
        }
      });
      return res.status(200).send({ status: 1, message: "Email sent" });
    } else {
      return res.status(404).send({ status: 0, message: "No such user" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/reset-password/confirm", async (req, res) => {
  const { inputToken, newPassword, repeatNewPassword } = req.body;
  if (app.locals.token === inputToken) {
    if (newPassword === repeatNewPassword) {
      if (newPassword.length < 3) {
        return res
          .status(400)
          .send({ status: 0, message: "Password does not fulfill the requirements" });
      } else {
        bcrypt.hash(newPassword, saltRounds, async (error, hashedPassword) => {
          if (newPassword === repeatNewPassword) {
            const updatedUser = await User.query()
              .select()
              .where({ email: app.locals.email })
              .limit(1)
              .patch({
                password: hashedPassword
              });
            return res.status(200).send({ status: 1, message: "Password reset success" });
          }
          if (error) {
            return res.status(500).send({});
          } else if (newPassword !== repeatNewPassword) {
            return res.status(404).send({
              status: 0, message: "Password and repeat password are not the same"
            });
          } else {
            return res.status(404).send({ status: 0, message: "Missing fields" });
          }
        });
      }
    }
  }
});

router.delete("/delete", async (req, res) => {
  const id = req.session.userID;
  console.log(id);
  console.log(req.session);

  try {
    const deletedCharacters = await Character.query().where("user_id", id).delete();
    console.log("does here");
    const deletedUser = await User.query().where("id", id).delete();
    req.session.destroy();
    return res.status(200).send({ status: 1, message: "User and Characters has been deleted" });
  } catch (err) {
    return res.status(500).send({ status: 0, message: "Error deleting the user" });
  }

});



module.exports = router;
