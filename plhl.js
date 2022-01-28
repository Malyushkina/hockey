const getTr = (position, time, goalOrFine, lastName, text = '') => {
  if (position === 'r') {
    console.log(
      `<tr>
            <td style="width:300px">&nbsp;</td>
            <td style="width:20px">&nbsp;</td>
            <td style="background-color:#464c54; height:60px; text-align:center; width:60px">${time}<br />
            <strong>${goalOrFine}</strong></td>
            <td class="td_uprl" style="width:20px">&nbsp;</td>
            <td class="td_upr" style="width:300px"><strong>${lastName}</strong><br />
            ${text}</td>
        </tr>
        <tr>
            <td colspan="5" style="height:10px">&nbsp;</td>
        </tr>`
    );
  }
  if (position === 'l') {
    console.log(
      `<tr>
      <td class="td_lgpr" style="text-align:right; width:300px"><strong>${lastName}</strong><br />
      ${text}</td>
      <td class="td_lgprl" style="width:20px">&nbsp;</td>
      <td style="background-color:#344a68; height:60px; text-align:center; width:60px">${time}<br />
      <strong>${goalOrFine}</strong></td>
      <td style="width:20px">&nbsp;</td>
      <td style="width:300px">&nbsp;</td>
  </tr>
  <tr>
      <td colspan="5" style="height:10px">&nbsp;</td>
  </tr>`
    );
  }
};

getTr('r', '41:50', '1:4', 'Чернов Олег', 'Бригадиров Александр');
getTr('r', '44:38', '2 мин', 'Бобров Игорь', 'Подножка');
getTr('l', '45:18', '2 мин', 'Ивлев Максим', 'Задержка клюшки соперника');
getTr('r', '50:47', '1:5', 'Старков Денис');
getTr('r', '54:39', '1:6', 'Серняев Алексей', 'Крошечкин Дмитрий');
getTr('r', '57:06', '1:7', 'Старков Денис', 'Финогеев Александр');
