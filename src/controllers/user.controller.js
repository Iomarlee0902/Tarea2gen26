const User = require("../models/user.model")

exports.findAllUsers = async (req, res) => {
  try {

    const users = await User.findAll({
      where: {
        status: 'available',
      }
    })

    return res.status(200).json({
      status: 'ok',
      users,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'failed',
      message: 'Something went wrong'
    })
  }
}

exports.createUser = async (req, res) => {
  try {

    const {name, email, password, role} = req.body;

    const user = await User.create({name, email, password, role});

    return res.status(200).json({
      status: 'ok',
      user,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'failed',
      message: 'Something went wrong'
    })
  }
}

exports.findUser = async (req, res) => {
  try {

    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      }
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      })
    }

    return res.status(200).json({
      status: 'ok',
      user,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'failed',
      message: 'Something went wrong'
    })
  }
}

exports.update = async (req, res) => {
  try {

    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findOne({
      where:{
        id,
        status: 'available',
      }
    });

    if(!user){
      return res.status(404).json({
        status: 'failed',
        message: 'User not found'
      })
    }

    await user.update({name, email})

    return res.status(200).json({
      status: 'ok',
      message: 'User updated'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'failed',
      message: 'Something went wrong'
    })
  }
}

exports.delete = async (req, res) => {
  try {

    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      }
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      })
    }

    await User.update({status: 'disabled'})
    
    return res.status(200).json({
      status: 'ok',
      message: 'user deleted successfully'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'failed',
      message: 'Something went wrong'
    })
  }
}