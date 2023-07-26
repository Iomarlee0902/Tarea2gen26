const Repair = require("../models/repair.model")

exports.findAllRepair = async (req, res) => {
    try {

      const repairs = await Repair.findAll({
        where: {
          status: 'pending',
        }
      })

    return res.status(200).json({
      status: 'ok',
      repairs,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'failed',
      message: 'Something went wrong'
    })
  }
}
exports.create = async (req, res) => {
    try {
      
      const { date, userId } = req.body;

      const repair = await Repair.create({ date, userId });

    return res.status(200).json({
      status: 'ok',
      repair,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'failed',
      message: 'Something went wrong'
    })
  }
}
exports.findRepair = async (req, res) => {
    try {

      const { id } = req.params;

      const repair = await Repair.findOne({
        where: {
          id,
          status: 'pending',
        }
      })

      if (!repair) {
        return res.status(404).json({
          status: 'error',
          message: 'Repair not found'
        });
      }

    return res.status(200).json({
      status: 'ok',
      repair,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'failed',
      message: 'Something went wrong'
    })
  }
}
exports.update = async(req, res) => {
    try {

      const { id } = req.params;
      const { status } = req.body;

      const repair = await Repair.findOne({
        where: {
          id,
          status: 'pending'
        }
      })

      if(!repair) {
        return res.status(404).json({
          status: 'error',
          message: 'repair not found'
        })
      }

      await Repair.update({ status })

    return res.status(200).json({
      status: 'ok',
      message: 'repair updated successfully'
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

      const repair = await Repair.findOne({
        where: {
          id,
          status: 'pending'
        }
      })

      if(!repair) {
        return res.status(404).json({
          status: 'error',
          message: 'repair not found'
        })
      }

      await Repair.update({ status: 'cancelled' })

    return res.status(200).json({
      status: 'ok',
      message: 'repair deleted successfully'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'failed',
      message: 'Something went wrong'
    })
  }
}