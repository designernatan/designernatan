(function() {
  var myCourses = [
    'prototipagem-alta-fidelidade-adobe-xd',
    'prototipagem-ux-link-com-telas-no-adobe-xd',
    'teste-usabilidade',
    'acessibilidade-web-design-inclusivos',
    'acessibilidade-web-front-end',
    'acessibilidade-web-front-end-parte-2',
    'sass',
    'less-css-simples-e-produtivo',
    'email-marketing-responsivo-parte-1',
    'email-marketing-responsivo-parte-2',
    'ux-base',
    'ux-strategy',
    'ux-usabilidade',
    'ux-melhorias-de-produto',
    'teste-de-usabilidade',
    'teste-de-usabilidade-entregando-resultados'
  ];

  for (var i = 0; i < myCourses.length; i++) {
    // Atualização da URL para apontar para o servidor proxy
    $.get("https://cursos.alura.com.br/api/curso-" + myCourses[i], function(curso) {
      courseFactory(curso);
    });
  }

  function courseFactory(curso) {
    var course = $('<div>').addClass('sectionCourses-course');
    var courseIcon = $('<img>').attr('src', 'https://www.alura.com.br/assets/api/cursos/' + curso.slug + '.svg').addClass('sectionCourses-course-icon');
    var courseName = $('<h3>').text(curso.nome).addClass('sectionCourses-course-name');

    var courseInfos = $('<div>').addClass('sectionCourses-course-infos');

    var courseRating = $('<p>').html('<strong>Rating: </strong>' + curso.nota.toFixed(1) + ' / 10').addClass('sectionCourses-course-rating').appendTo(courseInfos);

    var courseStudents = $('<p>').html('<strong>Students: </strong>' + curso.quantidade_alunos).addClass('sectionCourses-course-students').appendTo(courseInfos);

    var courseBtn = $('<a>').text('See course page').attr("href","https://www.alura.com.br/curso-online-" + curso.slug).addClass('sectionCourses-course-btn');

    course.append(courseIcon, courseName, courseInfos, courseBtn).appendTo($('.sectionCourses'));
  }
})();
