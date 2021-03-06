// -----------------------------
// Преобразуем время в локальное
// -----------------------------
function local_timestamp(epoch){
  var date = new Date();
  date.setTime(epoch*1000);
  var new_date = new Date(date.getTime() + date.getTimezoneOffset()*60*1000);
  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();
  new_date.setHours(hours-offset);
  return new_date.getTime();
}
// ----------------
// Timestamp в дату
// ----------------
function timestamp2date(epoch){
  var date = new Date();
  date.setTime(epoch);
  return date;
}
// ---------------------------------------------------
// SMA: Простое скользящее среднее
// Это тоже самое, что и среднее арифметическое
// points = все точки (median prices)
// cur_position - текущая позиция (последняя?)
// diff - за сколько временных интервалов рассчитываем
// ---------------------------------------------------
function sma(points, cur_position, diff){
  var result = 0;
  // --------------------------
  // diff вычитаем 1 т/к у него
  // нет нулевого индекса
  // --------------------------
  var count = cur_position - (diff-1);
  if(count < 0){
    return null;
  }
  // --------------------------
  // Нужно считать включительно
  // последний пункт
  // --------------------------
  var i = cur_position
  while(i >= count){
    result += parseFloat(points[i]);
    i -= 1;
  }
  result = result/diff;
  return Number(result.toFixed(4));
}
//################################################
// Стандартное отклонение (standard deviation)
// points = все точки (median prices)
// cur_position - текущая позиция (последняя?)
// diff - за сколько временных интервалов рассчитываем
//################################################
// Пример нахождения стандартного отклонения
// от 10 до 70 с шагом 10
//  10   20,  30, 40, 50, 60, 70
//  40   40,  40, 40, 40, 40, 40 - находим среднее
// -30, -20, -10, 0,  10, 20, 30 - находим разницу
// между значением и средним 10-40, 20-40...
// возводим разницу в квадрат -30*-30 = 900
// 900, 400, 100, 0, 100, 400, 900
// суммируем квадраты 2800(900+900+400+400+100+100)
// делим на кол-во элементов выборки минус 1
// 2800/(7-1) = 467
// Вычислаем квадратный корень sqrt(467) = 21,6
//################################################
// diff вычитаем 1 т/к у него нет нулевого индекса
//################################################
function std_dev(points, cur_position, diff){
  var result = 0;
  var count = cur_position - (diff-1);

  if(count < 0){
    return null;
  }
  // -------
  // Среднее
  // -------
  var middle = sma(points, cur_position, diff);
  // ----------------------------------------
  // Находим разницы между позицией и средним
  // Сразу возводим их в квадрат
  // ----------------------------------------
  var diffs = Array();
  var i = cur_position;
  while(i >= count){
    cur_diff = points[i] - middle;
    diffs.push(Math.pow(cur_diff, 2));
    i -= 1;
  }
  // -------------------------
  // Суммируем квадраты разниц
  // -------------------------
  var squares_summ = 0;
  for(var j=0; j<diffs.length; j++){
    squares_summ += diffs[j];
  }
  // -----------------------------------------
  // Делим на кол-во элементов выборки минус 1
  // -----------------------------------------
  var square = squares_summ / (diff-1);
  // ---------------------------
  // Вычисляем квадратный корень
  // ---------------------------
  result = Math.sqrt(square);
  return result;
}

//################################################
// Bollinger Bands
// ML = sma(points, cur_position, diff)
// TL(top_line) = ML(middle_line) + D * std_dev
// BL(bottom_line) = ML(middle_line) - D * std_dev
//################################################
// D = число стандартных отклонений
// diff вычитаем 1 т/к у него нет нулевого индекса
//################################################
function bollinger_bands(points, cur_position, diff, D){
  var result = Array();
  var count = cur_position - (diff-1);

  if(count < 0){
    return [null, null, null];
  }

  var ml = sma(points, cur_position, diff);
  var standard_deviation = std_dev(points, cur_position, diff);
  var tl = ml + D * standard_deviation;
  var bl = ml - D * standard_deviation;
  result = [Number(tl.toFixed(4)), Number(ml.toFixed(4)), Number(bl.toFixed(4))];
  return result;
}

// -----------------------------------------------
// У нас есть число digit,
// нам надо каждый шаг step удваивать это число
// -----------------------------------------------
// 0.35 ставка, выплата 0.66
// 35 = 66 (66-35=31 сколько это % от 35?)
// 35   100%
// 31   ?% 88% => 12% комиссия
// -----------------------------------------------
// 0.7 ставка, выплата 1.36
// 70 = 136 (136-70=66 сколько это % от 70?)
// 70   100%
// 66   ?% 94% => 6% комиссия
// -----------------------------------------------
// 1.4 ставка, выплата 2.72
// 140 = 272 (272-140=132 сколько это % от 140?)
// 140 = 100%
// 132 = ?% 94% => 6% комиссия
// -----------------------------------------------
// 2.8 ставка, выплата 5.44
// 280 = 544 (544-280=264 сколько это % от 280?)
// 280 = 100%
// 264 = ?% 94% => 6% комиссия
// -----------------------------------------------
// multiply => множитель, по умолчанию 2,
// с множителем в 1,5 можно 6 повторов сделать
// -----------------------------------------------
function martingail(digit, step, multiply){
  var summa = 0;
  var percent = 6;

  for(var i=0; i<step; i++){
    if(i === 0){
      summa += digit;
    }else{
      // -------------------------------------
      // От удваемого числа нужно плюсануть 6%
      // на первом шаге 12%, согласно расчетам
      // -------------------------------------
      if(i === 1){
        percent = 12;
      }
      six_percents = summa / 100 * percent
      summa = summa * multiply + six_percents
    }
  }
  return parseFloat(summa.toFixed(2));
}
