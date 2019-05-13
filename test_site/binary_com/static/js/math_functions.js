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