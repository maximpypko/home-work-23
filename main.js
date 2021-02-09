const $Button = document.querySelector('button');
const $containerFilms = document.createElement('DIV');
$Button.after($containerFilms);
const xhr = new XMLHttpRequest();

$Button.addEventListener('click', () => {
  if ($containerFilms.children.length == 0) {
    xhr.open('GET', 'https://swapi.dev/api/films/');
    xhr.send();
    xhr.responseType = 'json';
    
    xhr.onload = function () {
      if (xhr.status === 200) {
        const $Ul = document.createElement('UL');
        $Ul.className = 'films__list';

        xhr.response.results.forEach(element => {
          const $Li = document.createElement('LI');
          const $A = document.createElement('A');
          $A.append(element.title);
          $Li.className = 'films__item';
          $Li.append($A);
          $Ul.append($Li);

          $Li.addEventListener('click', () => {
            if ($Li.children.length == 1) {
              const $containerStarships = document.createElement('UL');
              $containerStarships.className = 'starships__list';

              element.starships.forEach(url => {
                const starships = new XMLHttpRequest();
                starships.open('GET', url);
                starships.send();
                starships.responseType = 'json';
               
                starships.onload = function () {
                  if (starships.status === 200) {
                    const $Starship = document.createElement('LI');
                    $Starship.className = 'starships__item';
                    $Starship.append(starships.response.model);
                    $containerStarships.append($Starship);
                  } else {
                    getErrorCode(starships);
                  }
                }
              })
              $Li.append($containerStarships);
            } else {
              $Li.children[1].remove();
            }
          })
        });
        $containerFilms.appendChild($Ul);
      } else {
        getErrorCode(xhr);
      }
    }
  } else {
    $containerFilms.children[0].remove();
  }
});

function getErrorCode(el) {
  const $Div = document.createElement('DIV');
  $Div.append(`Код ошибки ${el.status}`);
  $Button.after($Div);
};








