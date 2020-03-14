<template>
    <div class="chart-box">
      <v-chart :options="polar"/>
    </div>
</template>

<script>
let data_val=[6212, 7515, 9565, 8456, 200000],
    xAxis_val=['2016', '2017', '2018', '2019', '2020'];
let data_val1=[0,0,0,0,0];
export default {
    
  name: 'chartPie',
  data () {
    return {
      polar: {
            // backgroundColor:'#293042',
            grid:{
                left:10,
                top:10,
                bottom:20,
                right:40,
                containLabel:true
            },
            tooltip:{
                show:true,
                backgroundColor:'#384157',
                borderColor:'#384157',
                borderWidth:1,
                formatter:'{b}:{c}'+"人",
                extraCssText:'box-shadow: 0 0 5px rgba(0, 0, 0, 1)'
            },
            xAxis: {
                data: xAxis_val,
                boundaryGap:false,
                axisLine:{
                    show:false
                },
                axisLabel: {
                    textStyle: {
                        color: '#5c6076'
                    }  
                },
                axisTick:{
                    show:false
                }
            },
            yAxis: { 
               
                ayisLine:{
                    show:false
                },
                axisLabel: {
                    textStyle: {
                        color: '#5c6076'
                    }  
                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        color:'#2e3547',
                        type: 'dotted'
                    }
                },
                axisLine: {
                        lineStyle: {
                            color: '#384157'
                        }
                    }
            },
            
            series: [
                {
                    type: 'bar',
                    name:'linedemo',
                    
                    
                    tooltip:{
                        show:false
                    },
                    animation:false,
                    barWidth:1.4,
                    hoverAnimation:false,
                    data:data_val,
                    itemStyle:{
                        normal:{
                            color:'#06efec',
                            opacity:0.6,
                            label:{
                                show:false
                            }
                        }
                    }
                },
                {
                    type: 'line',
                    name:'距离',
                    
                    animation:false,
                    symbol:'circle',
            
                    hoverAnimation:false,
                    data:data_val1,
                    itemStyle:{
                        normal:{
                            color:'#f17a52',
                            opacity:0,
                        }
                    },
                    lineStyle:{
                        normal:{
                            width:1,
                            color:'#384157',
                            opacity:1
                        }
                    }
                },
                {
                    type: 'line',
                    name:'linedemo',
                    smooth:true,
                    symbolSize:10,
                    animation:false,
                    lineWidth:1.2,
                    hoverAnimation:false,
                    data:data_val,
                    symbol:'circle',
                    lineStyle: {
                        normal: {
                            width: 3,
                            color: '#01f8f3',
                            shadowColor: '#01f8f3',
                            shadowBlur: 15,
                            shadowOffsetY: 0
                        }
                    },
                    itemStyle:{
                        normal:{
                            color:'#ffda22',
                            shadowBlur: 14,
                            shadowColor: '#ffda22',
                            label:{
                                show:true,
                                position:'top',
                                textStyle:{
                                    color:'#06efec',
                            
                                }
                            }
                        }
                    },
                
                areaStyle:{
                        normal:{
                            color:'#06efec',
                            opacity:0.08
                        }
                    }
                    
                }
            ],
        animationDuration: 2000
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    
</style>
