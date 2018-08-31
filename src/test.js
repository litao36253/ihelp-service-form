/*let arr =[
    {
      PROVINCECHNNAME:'广东',
      PROVINCENAME:'',
      CITYCHANNAME:'深圳',
      CITY_SPEC_ID:'12'
    },
  {
    PROVINCECHNNAME:'山东',
    PROVINCENAME:'',
    CITYCHANNAME:'济南',
    CITY_SPEC_ID:'13'
  },
  ];
let it =  arr.find(item=>{
  return item.CITY_SPEC_ID == 13
})
console.log(it);*/

let arr = [{
  val:'251',
  label: '江苏',
  cities: [
    {
      val:'25101',
      label: '南京',
      cities:[
        {
          val:'2510101',
          label: '南山区',
        }
      ]
    }
  ]
}, {
  val:'252',
  label: '浙江',
  cities: []
}]

function f(arr,val) {
  for(let i=0; i<arr.length; i++){
    if(arr[i].val == val){
      return arr[i]
    }
  }
  for(let i=0; i<arr.length; i++){
    return f(arr[i]['cities'],val)
  }
}
console.log(f(arr, '2510101'));


