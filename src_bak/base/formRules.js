let validatePass = (rule, value, callback)=>{
  if (!value) {
    return callback(new Error('年龄不能为空'));
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('请输入数字值'));
    } else {
      if (value < 18) {
        callback(new Error('必须年满18岁'));
      } else {
        callback();
      }
    }
  }, 1000);

}
export default {
  CHANNEL:[
    { validator: validatePass, trigger: 'blur' }

  ]
}
