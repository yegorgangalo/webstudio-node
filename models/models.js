const { Schema, model } = require('mongoose')

const mailingSchema = new Schema({
  email: {
    type: String,
    required: true
  }
})

const formSchema = new Schema({
  name: {
    type: String,
    required: [true, 'is required'],
    minlength: [5, 'Min length 5 characters'],
    maxlength: [30, 'Max length 30 characters'],
    validate: (text) => /^[a-zA-ZА-Яа-яЁёієґї\s]+$/i.test(text)
  },
  tel: {
    type: Number,
    required: [true, 'is required'],
    validate: (number) => /^380[0-9]{9}(\s*)?$/.test(number)
  },
  email: {
    type: String,
    required: [true, 'is required'],
    validate: (mail) => /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/.test(mail)
  },
  message: {
    type: String,
    required: false
  }
})

const MailModel = model('MailModel', mailingSchema);
const FormModel = model('FormModel', formSchema);
module.exports = {MailModel, FormModel}