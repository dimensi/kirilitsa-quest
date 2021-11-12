const questions = [
  {
    question: "Акмурат Ходжатов",
    answer: "Akmurat Khodzhatov",
  },
  {
    question: "Александр Ходыкин",
    answer: "Aleksandr Khodykin",
  },
  {
    question: "Александр Поляков",
    answer: "Alexander Polyakov",
  },
  {
    question: "Александр Жидовленко",
    answer: "Alexander Zhidovlenko",
  },
  {
    question: "Александр Зуев",
    answer: "Alexander Zuev",
  },
  {
    question: "Александр Артюхов",
    answer: "Alexandr Artyukhov",
  },
  {
    question: "Александр Леонов",
    answer: "Alexandr Leonov",
  },
  {
    question: "Александр Вежлев",
    answer: "Alexandr Vezhlev",
  },
  {
    question: "Амаль Абдуллаев",
    answer: "Amal Abdullaev",
  },
  {
    question: "Антон Машошин",
    answer: "Anton Mashoshin",
  },
  {
    question: "Дарья Голубева",
    answer: "Darya Golubeva",
  },
  {
    question: "Денис Хрипков",
    answer: "Denis Khripkov",
  },
  {
    question: "Дима Нгуен",
    answer: "Dmitriy Nguyen",
  },
  {
    question: "Дмитрий Данилов",
    answer: "Dmitry Danilov",
  },
  {
    question: "Дмитрий Гадеев",
    answer: "Dmitry Gadeev",
  },
  {
    question: "Егор Ней",
    answer: "Egor Ney",
  },
  {
    question: "Егор Половинкин",
    answer: "Egor Polovinkin",
  },
  {
    question: "Игорь Буруля",
    answer: "Igor Burulya",
  },
  {
    question: "Игорь Дизгинжили",
    answer: "Igor Dizginzhili",
  },
  {
    question: "Иван Брякунов",
    answer: "Ivan Bryakunov",
  },
  {
    question: "Кирилл Столяров",
    answer: "Kirill Stolyarov",
  },
  {
    question: "Константин Грушин",
    answer: "Konstantin Grushin",
  },
  {
    question: "Максим Алехнович",
    answer: "Maksim Alekhnovich",
  },
  {
    question: "Максим Чернухин",
    answer: "Maksim Chernukhin",
  },
  {
    question: "Марина Алексюк",
    answer: "Marina Aleksyuk",
  },
  {
    question: "Михаил Авдеев",
    answer: "Mikhail Avdeev",
  },
  {
    question: "Михаил Сороколет",
    answer: "Mikhail Sorokolet",
  },
  {
    question: "Наталия Шпер",
    answer: "Natalia Shper",
  },
  {
    question: "Николай Лаевский",
    answer: "Nikolai Laevskii",
  },
  {
    question: "Николай Шубин",
    answer: "Nikolay Shubin",
  },
  {
    question: "Никита Нафранец",
    answer: "Nikita Nafranets",
  },
  {
    question: "Олег Кузняк",
    answer: "Oleg Kuznyak",
  },
  {
    question: "Олег Морозов",
    answer: "Oleg Morozov",
  },
  {
    question: "Ольга Копьева",
    answer: "Olga Kopyeva",
  },
  {
    question: "Павел Андреев",
    answer: "Pavel Andreev",
  },
  {
    question: "Паша Старовойтов",
    answer: "Pavel Starovoytov",
  },
  {
    question: "Роман Гранков",
    answer: "Roman Grankov",
  },
  {
    question: "Роман Новожилов",
    answer: "Roman Novozhilov",
  },
  {
    question: "Сергей Пеняев",
    answer: "Penyaev Sergey",
  },
  {
    question: "Сергей Сахаровский",
    answer: "Sergei Sakharovskii",
  },
  {
    question: "Степан Быстрай",
    answer: "Stepan Bystray",
  },
  {
    question: "Владислав Перетягин",
    answer: "Vlad Peretyagin",
  },
  {
    question: "Всеволод Андрущенко",
    answer: "Vsevolod Andruschenko",
  },
  {
    question: "Ян Павленко",
    answer: "Yann Pavlenko",
  },
  {
    question: "Ян Парфенов",
    answer: "Yan Parfenov",
  },
];

export default function HandleResponse(req, res) {
  if (!Array.isArray(req.body)) {
    res.status(400).body("Wrong type");
    return;
  }

  const result = req.body.filter(({ question, answer }) => {
    const quest = questions.find((item) => item.question === question);
    if (!quest) return false;
    return quest.answer === answer;
  });

  res.status(200).json({
    total: req.body.length,
    right: result.length,
  });
}
