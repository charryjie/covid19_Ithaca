import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'covid19',
  initialState: {
    allData: [],
    dayChange: {},
    today: "",
    selectCard: -1,
    selectIdx: -1
  },
  reducers: {
    updateAllData: (state, action) => {
      let data = action.payload;
      let len = data.length;
      let date = [], increase = [], sum = [], avg = [], active = [], hospitalization = [], test=[], recover = [], death=[];
      data.forEach((item) => {
        let datearr = item.date.toString().replace('T','-').split('-');
        let month = datearr[1];
        let day = datearr[2];
        date.push(month + '/' + day);
        increase.push(item.new_positive);
        sum.push(item.positive);
        avg.push(item.seven_avg.toFixed(2));
        active.push(item.total_active);
        hospitalization.push(item.hospitalization);
        test.push(item.total_test);
        recover.push(item.recovered);
        death.push(item.death)
      });
      let today = data[len-1].date.toString().replace('T','-').split('-');
      state.today = today[0] + '-' + today[1] + '-' + today[2];
      state.selectIdx = len - 1;
      state.dayChange = {date: date, day_sum: sum, day_increase: increase, seven_avg: avg, day_active: active, day_hospitalization: hospitalization, day_test: test, day_recovered: recover, day_death: death}
      state.allData = data
    },
    updateCard: (state, action) => {
      state.selectCard = action.payload;
    },
    updateIdx: (state, action) => {
      state.selectIdx = action.payload;
    }
  },
});



export const { updateAllData, updateCard, updateIdx } = slice.actions;
// export const selectNewDay = state => state.covid19.newDay;
// export const selectTotal = state => state.covid19.total;
export const selectDayChange = state => state.covid19.dayChange;
export const selectAllData = state => state.covid19.allData;
export const selectToday = state => state.covid19.today;
export const selectCard = state => state.covid19.selectCard;
export const selectIdx = state => state.covid19.selectIdx;
export const selectCurrentChange = state => {
  let data = state.covid19.allData
  let idx = state.covid19.selectIdx
  
  if (idx === 0) {
    return {
      active: data[idx].total_active,
      hospitalization: data[idx].hospitalization,
      positive_ratio: (data[idx].positive / data[idx].total_test * 100).toFixed(1),
      recover_ratio: (data[idx].recovered / data[idx].positive * 100).toFixed(1),
      death_ratio: (data[idx].death / data[idx].positive * 100).toFixed(1),
    }
  }
  return {
    active: data[idx].total_active - data[idx - 1].total_active,
    hospitalization: data[idx].hospitalization - data[idx - 1].hospitalization,
    positive_ratio: (data[idx].positive / data[idx].total_test * 100).toFixed(1),
    recover_ratio: (data[idx].recovered / data[idx].positive * 100).toFixed(1),
    death_ratio: (data[idx].death / data[idx].positive * 100).toFixed(1),
  }
}
export default slice.reducer;