//  Aplicatie care ne ofera posterele serialelor TV in urma submiterii unor cuvinte cheie in form  |  `...${}...` => string template literal

const form = document.querySelector('#form');
const container = document.querySelector('#container');
const input = document.querySelector('input');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    removePosters();
    const config = { params: { q: input.value } }
    const shows = await axios.get('https://api.tvmaze.com/search/shows', config)
    makePosters(shows.data)
    form.elements.show.value = '' // input.value = ''
})

const makePosters = (shows) => { //array de seriale
    for (let result of shows) {
        if (result.show.image) {
            const div = document.createElement('div');
            const img = document.createElement('img');
            const text = document.createElement('span');

            img.src = result.show.image.medium;
            text.innerText = result.show.name;

            div.appendChild(img);
            div.appendChild(text);
            container.append(div);
        }
        console.log(result.show) //informatii despre fiecare show
    }
}

const removePosters = () => {
    const divs = document.querySelectorAll('div');
    for (let div of divs)
        div.remove();

    //     const imgs = document.querySelectorAll('img')
    //     for (let img of imgs) {
    //         img.remove()
    //     }
    //     const spans = document.querySelectorAll('span')
    //     for (let span of spans)
    //         span.remove()
}
