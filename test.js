const team1 = `1	 Войлочников Денис		В	Да
39	 Турулин Владимир		В	Да
2	 Вершинин Олег	К	З	Да
3	 Степанов Дмитрий		З	Нет
4	 Вилков Юрий		Н	Нет
9	 Кондрашин Владимир		Н	Нет
11	 Вилков Антон                                               		Н	Нет
12	 Малофеев Владислав 		З	Да
13	 Смирнов Максим                             	А	Н	Да
17	 Красильников Александр		З	Да
19	 Кирин Олег	А	Н	Да
24	 Сущев Евгений		З	Да
33	 Фролочкин Александр		З	Да
77	 Мерзлов Сергей		З	Да
81	 Войлочников Михаил                           		Н	Да
83	 Казаров Олег		Н	Да
91	 Смирнов Андрей		З	Нет
95	 Козин Данила                                                   		Н	Нет

`;
const team2 = `1	 Калашников Андрей	Р	В	Нет
12	 Юдин Роман		В	Нет
30	 Акчурин Ренат		В	Да
2	 Федосеев Михаил		З	Нет
3	 Цымбал Александр	А	З	Да
7	 Середенин Алексей		Н	Нет
9	 Панкратов Андрей		Н	Нет
10	 Усачев Павел		Н	Да
11	 Барыщев Андрей		Н	Да
15	 Пивняк Дмитрий                                   		Н	Да
17	 Моисеев Данила 		Н	Да
23	 Лукин Александр		Н	Да
25	 Ануфриев Юрий		З	Нет
29	 Беляев Михаил	К	Н	Да
37	 Булыгин Юрий		Н	Нет
44	 Гусев Сергей                                               		Н	Да
47	 Белобородов Дмитрий		Н	Да
71	 Моисеев Сергей                                         		З	Да
77	 Никитин Юрий		З	Да
84	 Купцов Павел                              	А	Н	Да
87	 Коньков Роман		Н	Нет
88	 Лисенков Дмитрий		Н	Нет
89	 Егоров Сергей		Н	Да

`;

const goal1 = `1	31	17	81	13		
2	32	19	17	19		
3	33	47	83	13		
4	37	52	13	81		
5	50	26	13	24	83	
`;
const goal2 = `1	7	03	44			
2	11	08	29	10		
3	20	31	47	23		
4	43	50	23	29	47	
`;
const del1 = `16	27	17	2	ПОДН	16	27	18	27`;
const del2 = `39	52	11	2	ПОДН	39	52	41	52`;
function createObj(team = ``) {
  const teamStr = team.replace(/\s+/g, ';');
  const teamArr = teamStr.split(';');

  const teamArrObj = [];
  const indexNum = [];
  const newTeamArr = [];
  teamArr.forEach((elem, index) => {
    if (/\d/.test(elem)) {
      indexNum.push(index);
    }
  });

  for (let i = 0; i < indexNum.length; i++) {
    const beg = indexNum[i];
    const end = indexNum[i + 1] || teamArr.length - 1;
    newTeamArr.push(teamArr.slice([beg], [end]));
  }

  newTeamArr.forEach((elem) => {
    let post = ``;
    if (elem.length > 5) {
      for (let j = 3; j < elem.length - 2; j++) {
        post += `(${elem[j]}) `;
      }
    }
    const gamer = {
      number: elem[0],
      lastName: elem[1],
      name: elem[2],
      post: post.toUpperCase(),
      position: elem[elem.length - 2].toLowerCase(),
      isGaming: elem[elem.length - 1],
    };
    if (gamer.position === 'в') {
      gamer.position = 'вр';
    }
    if (gamer.isGaming === 'Да') {
      teamArrObj.push(gamer);
    }
  });

  return teamArrObj;
}

function createTableData(team1, team2) {
  const team1Arr = createObj(team1);
  const team2Arr = createObj(team2);
  if (team1Arr.length > team2Arr.length) {
    while (team1Arr.length > team2Arr.length) {
      team2Arr.push({
        number: '',
        lastName: '',
        name: '',
        post: '',
        position: '',
      });
    }
  } else if (team1Arr.length < team2Arr.length) {
    while (team1Arr.length < team2Arr.length) {
      team1Arr.push({
        number: '',
        lastName: '',
        name: '',
        post: '',
        position: '',
      });
    }
  }

  let table = ``;
  team1Arr.forEach((elem) => {
    for (let elem2 of team2Arr) {
      if (team1Arr.indexOf(elem) === team2Arr.indexOf(elem2)) {
        table += `${elem.number};${elem.position};${elem.lastName} ${elem.name} ${elem.post};;${elem2.number};${elem2.position};${elem2.lastName} ${elem2.name} ${elem2.post}\n`;
      }
    }
  });
  console.log(table);
  return table;
}

createTableData(team1, team2);

function generateGoals(goal) {
  const goalArr = goal.split('\n');
  const goalArrObj = [];
  goalArr.forEach((elem) => {
    const elem1 = elem.split('\t');
    if (elem1[0] !== '') {
      goalArrObj.push({
        goal: +elem1[0],
        minute: elem1[1],
        seconds: elem1[2],
        scoredGoal: +elem1[3],
        helped1: elem1[4] ? +elem1[4] : '',
        helped2: elem1[5] ? +elem1[5] : '',
      });
    }
  });
  goalArr.sort((a, b) => {
    return +a.minute - +b.minute;
  });

  return goalArrObj;
}
const generateDel = (del) => {
  const delArr = del.split('\n');
  const delArrObj = [];
  delArr.forEach((elem) => {
    const elem1 = elem.split('\t');
    if (elem1[0] !== '') {
      delArrObj.push({
        deletedGamer: +elem1[2] || 'Командный',
        minute: elem1[0],
        seconds: elem1[1],
        fineMinuts: +elem1[3],
        description: elem1[4],
      });
    }
  });

  return delArrObj;
};

const findGamer = (num, teamArrObj) => {
  let str = null;
  teamArrObj.forEach((elem) => {
    if (num != null && num == elem.number) {
      str = `${elem.lastName} ${elem.name}`;
    }
  });
  return str;
};

getPeriod = (arr, teamNumber) => {
  arr.forEach((elem) => {
    elem.team = teamNumber;
    if (0 <= +elem.minute && +elem.minute < 20) {
      elem.period = 1;
    }
    if (20 <= +elem.minute && +elem.minute < 40) {
      elem.period = 2;
    }
    if (40 <= +elem.minute && +elem.minute < 60) {
      elem.period = 3;
    }
    if (60 <= +elem.minute) {
      elem.period = 'bullits';
    }
  });

  return arr;
};
function createProtocol(goal1, goal2, team1, team2, del1, del2) {
  const team1Obj = createObj(team1);
  const team2Obj = createObj(team2);
  const goalTeam1 = generateGoals(goal1);
  const goalTeam2 = generateGoals(goal2);
  const delTeam1 = generateDel(del1);
  const delTeam2 = generateDel(del2);
  goalTeam1.forEach((elem) => {
    elem.scoredGoal = findGamer(+elem.scoredGoal, team1Obj);
    elem.helped1 = findGamer(+elem.helped1, team1Obj);
    elem.helped2 = findGamer(+elem.helped2, team1Obj);
  });

  goalTeam2.forEach((elem) => {
    elem.scoredGoal = findGamer(+elem.scoredGoal, team2Obj);
    elem.helped1 = findGamer(+elem.helped1, team2Obj);
    elem.helped2 = findGamer(+elem.helped2, team2Obj);
  });

  delTeam1.forEach((elem) => {
    elem.deletedGamer = findGamer(+elem.deletedGamer, team1Obj) || 'Командный';
    elem.description = descriptionLibrary.get(elem.description);
  });
  delTeam2.forEach((elem) => {
    elem.deletedGamer = findGamer(+elem.deletedGamer, team2Obj) || 'Командный';
    elem.description = descriptionLibrary.get(elem.description);
  });
  const goalTeam1Reached = getPeriod(goalTeam1, 1);
  const goalTeam2Reached = getPeriod(goalTeam2, 2);
  const delTeam1Reached = getPeriod(delTeam1, 1);
  const delTeam2Reached = getPeriod(delTeam2, 2);
  const sumData = goalTeam1Reached
    .concat(goalTeam2Reached)
    .concat(delTeam1Reached)
    .concat(delTeam2Reached);

  const sortData = sumData.sort((a, b) => {
    return +a.minute - +b.minute;
  });
  const period1 = sortData.filter(({ period }) => period == 1);
  const period2 = sortData.filter(({ period }) => period == 2);
  const period3 = sortData.filter(({ period }) => period == 3);
  const bullits = sortData.filter(({ period }) => period == 'bullits');
  const protocol = [
    {
      period1,
    },
    {
      period2,
    },
    {
      period3,
    },
    {
      bullits,
    },
  ];
  // console.log(protocol)
  return protocol;
}
generateStr = (arr, team1Goals = 0, team2Goals = 0) => {
  let str = ``;

  arr.forEach((elem) => {
    if (elem.team === 1) {
      if (elem.goal) {
        team1Goals++;
        str += `<b>${elem.scoredGoal}</b><br/>`;
        if (elem.helped1) {
          str += `${elem.helped1}`;
        }
        if (elem.helped2) {
          str += `, ${elem.helped2};${elem.minute}:${elem.seconds}<br/><b>${team1Goals}:${team2Goals}</b>;\n`;
        } else {
          str += `;${elem.minute}:${elem.seconds}<br/><b>${team1Goals}:${team2Goals}</b>;\n`;
        }
      }
      if (elem.fineMinuts) {
        str += `<b>${elem.deletedGamer}</b><br/>${elem.description};${elem.minute}:${elem.seconds}<br/><b>${elem.fineMinuts} мин</b>;\n`;
      }
    }
    if (elem.team === 2) {
      if (elem.goal) {
        team2Goals++;
        str += `;${elem.minute}:${elem.seconds} <br/><b>${team1Goals}:${team2Goals}</b>;<b>${elem.scoredGoal}</b><br/>`;
        if (elem.helped1) {
          str += `${elem.helped1}`;
        }
        if (elem.helped2) {
          str += `, ${elem.helped2}\n`;
        } else {
          str += `\n`;
        }
      }
      if (elem.fineMinuts) {
        str += `;${elem.minute}:${elem.seconds} <br/> <b>${elem.fineMinuts} мин</b>;<b>${elem.deletedGamer}</b><br/>${elem.description}\n`;
      }
    }
  });
  console.log(str);
  return { str, team1Goals, team2Goals };
};
createProtocolData = (goal1, goal2, team1, team2, del1, del2) => {
  const protocol = createProtocol(goal1, goal2, team1, team2, del1, del2);
  const firstPeriod = protocol.find((elem) => elem.period1);
  const secondPeriod = protocol.find((elem) => elem.period2);
  const thirdPeriod = protocol.find((elem) => elem.period3);
  const bullits = protocol.find((elem) => elem.bullits);
  const str1 = generateStr(firstPeriod.period1);
  const str2 = generateStr(
    secondPeriod.period2,
    str1.team1Goals,
    str1.team2Goals
  );
  const str3 = generateStr(
    thirdPeriod.period3,
    str2.team1Goals,
    str2.team2Goals
  );
  const str4 = generateStr(bullits.bullits, str3.team1Goals, str3.team2Goals);
};

const descriptionLibrary = new Map();
descriptionLibrary.set('АГРЕС', 'Агрессор в драке');
descriptionLibrary.set('АТ-В-ГОЛ', 'Атака в голову или шею');
descriptionLibrary.set('БЛОК', 'Атака игрока, не владеющего шайбой');
descriptionLibrary.set('АТ-ВР', 'Атака вратаря');
descriptionLibrary.set('АТ-СЗ', 'Атака сзади');
descriptionLibrary.set('БР-КЛ', 'Бросок клюшки');
descriptionLibrary.set('ВБ-ШБ', 'Выброс шайбы');
descriptionLibrary.set('ГРУБ', 'Грубость');
descriptionLibrary.set('ДИСЦ', 'Дисциплинарный штраф');
descriptionLibrary.set('ДИС-КН', 'Дисциплинарный штраф до конца матча');
descriptionLibrary.set('ДРАКА', 'Драка');
descriptionLibrary.set('ЗАЧИН', 'Зачинщик драки');
descriptionLibrary.set('ЗД-ИГ', 'Задержка игры');
descriptionLibrary.set('ЗД-КЛ-СП', 'Задержка клюшки соперника');
descriptionLibrary.set('ЗД-КЛ', 'Задержка клюшкой');
descriptionLibrary.set('ЗД-КА', 'Задержка соперника');
descriptionLibrary.set('ЗД-ШБ', 'Задержка шайбы руками');
descriptionLibrary.set('СЛ-КЛ', 'Игра со сломанной клюшкой');
descriptionLibrary.set('ВП-КЛ', 'Игра высоко поднятой клюшкой');
descriptionLibrary.set('КЛ-УД', 'Колющий удар');
descriptionLibrary.set('СК-ШТ', 'Малый скамеечный штраф');
descriptionLibrary.set('НП-АТ', 'Неправильная атака');
descriptionLibrary.set('ЧС-СТ', 'Нарушение численного состава');
descriptionLibrary.set('НС-КЛ', 'Нестандартная клюшка');
descriptionLibrary.set('НАР-ЭК', 'Опасное снаряжение');
descriptionLibrary.set('НС-ПВ', 'Оскорбление судей и неспортивное поведение');
descriptionLibrary.set('ОТ-ИГ', 'Отказ начать игру');
descriptionLibrary.set('ОТСЧ', 'Отсечение');
descriptionLibrary.set('ПЛЕВОК', 'Плевок');
descriptionLibrary.set('ПОДН', 'Подножка');
descriptionLibrary.set('ПОДС', 'Подсечка');
descriptionLibrary.set('ПЗ-ПР', 'Поздний силовой прием');
descriptionLibrary.set('ПР-ИН', 'Предупреждение инфекций');
descriptionLibrary.set(
  'ПК-СК',
  'Покидание скамейки	штрафников/запасных/во время конфликта'
);
descriptionLibrary.set('СД-ВР', 'Сдвиг ворот');
descriptionLibrary.set('СИМ', 'Симуляция');
descriptionLibrary.set('ТЛ-БР', 'Толчок на борт');
descriptionLibrary.set('ТЛ-КЛ', 'Толчок клюшкой');
descriptionLibrary.set('УД-ГОЛ', 'Удар головой');
descriptionLibrary.set('УД-КЛ', 'Удар клюшкой');
descriptionLibrary.set('УД-К-КЛ', 'Удар концом клюшки');
descriptionLibrary.set('УД-КОЛ', 'Удар коленом');
descriptionLibrary.set('УД-ЛОК', 'Удар локтем');
descriptionLibrary.set('УД-НГ', 'Удар ногой');
descriptionLibrary.set('УКУС', 'Укус');
descriptionLibrary.set('КН-ЗР', 'Физический контакт со зрителем');
descriptionLibrary.set(
  'ШТ-ВР',
  'Штрафы вратаря	игра за красной линией/покидание площади ворот в конфликте/помещающий шайбу на сетку ворот/отправляющийся к скамейке в остановке'
);

createProtocolData(goal1, goal2, team1, team2, del1, del2);
