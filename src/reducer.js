import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'covid19',
  initialState: {
    selectIdx: -1,
    allData: [],
    newDay: {},
    total: {},
    dayChange: {},
    today: "",
    cardStyle: {background: "white"}
  },
  reducers: {
    updateByKey: (state, action) => {
      state.selectIdx = action.payload;
    },
    updateAllData: (state, action) => {
      let data = action.payload;
      let len = data.length;
      let date = [], increase = [], sum = [], avg = [], active = [];
      data.forEach((item) => {
        let datearr = item.date.toString().replace('T','-').split('-');
        let month = datearr[1];
        let day = datearr[2];
        date.push(month + '/' + day);
        increase.push(item.new_positive);
        sum.push(item.positive);
        avg.push(item.seven_avg.toFixed(2));
        active.push(item.total_active)
      });
      let today = data[len-1].date.toString().replace('T','-').split('-');
      state.today = today[0] + '-' + today[1] + '-' + today[2]
      
      state.newDay = {new_positive: data[len-1].new_positive, new_hospitalization: data[len-1].hospitalization - data[len-2].hospitalization, new_test: data[len-1].new_test, 
        pending_result: data[len-1].pending_result, new_totalactive: data[len-1].total_active - data[len-2].total_active}
      state.total = {positive: data[len-1].positive, total_test: data[len-1].total_test, recovered: data[len-1].recovered, death: data[len-1].death, 
        hospitalization: data[len-1].hospitalization, positive_ratio: (data[len-1].positive / data[len-1].total_test * 100).toFixed(1), recover_ratio: (data[len-1].recovered / data[len-1].positive * 100).toFixed(1),
        death_ratio: (data[len-1].death / data[len-1].positive * 100).toFixed(1), total_active: data[len-1].total_active}
      state.dayChange = {date: date, day_sum: sum, day_increase: increase, seven_avg: avg, day_active: active}
      state.allData = data
    },
    changeColor: (state, action) => {
      state.cardStyle.background = action.payload;
    }
  },
});



export const { updateByKey, updateAllData, changeColor } = slice.actions;
export const selectIdx = state => state.covid19.selectIdx;
export const selectNewDay = state => state.covid19.newDay;
export const selectTotal = state => state.covid19.total;
export const selectDayChange = state => state.covid19.dayChange;
export const selectAllData = state => state.covid19.allData;
export const selectToday = state => state.covid19.today;
export const selectCardStyle = state => state.covid19.cardStyle;
export default slice.reducer;