const ContactInquiry = require('../models/ContactInquiry');

// Create new contact inquiry
exports.createContactInquiry = async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const inquiryNumber = `INQ${Date.now().toString().slice(-8)}`;

    const inquiry = new ContactInquiry({
      inquiryNumber,
      fullName,
      email,
      phone,
      subject: subject || 'General Inquiry',
      message,
      status: 'New'
    });

    await inquiry.save();

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been received. We will contact you soon.',
      inquiryId: inquiry._id,
      inquiryNumber: inquiry.inquiryNumber,
      data: inquiry
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting inquiry',
      error: error.message
    });
  }
};

// Get all inquiries
exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await ContactInquiry.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching inquiries',
      error: error.message
    });
  }
};

// Get inquiry by ID
exports.getInquiryById = async (req, res) => {
  try {
    const inquiry = await ContactInquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }
    res.json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    console.error('Error fetching inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching inquiry',
      error: error.message
    });
  }
};

// Get inquiries by phone
exports.getInquiriesByPhone = async (req, res) => {
  try {
    const { phone } = req.params;
    const inquiries = await ContactInquiry.find({ phone }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching inquiries',
      error: error.message
    });
  }
};

// Get inquiries by status
exports.getInquiriesByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const inquiries = await ContactInquiry.find({ status }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching inquiries',
      error: error.message
    });
  }
};

// Update inquiry status and add response (Admin)
exports.updateInquiryStatus = async (req, res) => {
  try {
    const { status, response } = req.body;
    
    if (!['New', 'In Progress', 'Resolved', 'Closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const updateData = {
      status,
      updatedAt: Date.now()
    };

    if (response) {
      updateData.response = response;
      updateData.respondedAt = Date.now();
    }

    const inquiry = await ContactInquiry.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.json({
      success: true,
      message: 'Inquiry status updated',
      data: inquiry
    });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating inquiry',
      error: error.message
    });
  }
};

// Delete inquiry
exports.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await ContactInquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }
    res.json({
      success: true,
      message: 'Inquiry deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting inquiry',
      error: error.message
    });
  }
};

// Get inquiry statistics
exports.getInquiryStats = async (req, res) => {
  try {
    const totalInquiries = await ContactInquiry.countDocuments();
    const inquiriesByStatus = await ContactInquiry.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        totalInquiries,
        inquiriesByStatus
      }
    });
  } catch (error) {
    console.error('Error fetching inquiry stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};
