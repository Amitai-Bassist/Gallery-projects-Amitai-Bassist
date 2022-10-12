console.log('Starting up');

$(document).ready(init)

function init(){
    renderProtfolio()
    renderProtfolioModals()
    
}

function renderProtfolio(){
    var projects = getProjs()
    var counter = 1
    projects = projects.map(project => {
        var num = counter++
        return `
        <div class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${num}">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="img/portfolio/0${num}-${project.id}.jpg" alt="">
          </a>
          <div class="portfolio-caption">
            <h4>${project.name}</h4>
            <p class="text-muted">${project.title}</p>
          </div>
        </div>
        `
    })
    var $elShowProjs = $('.show-proj')
    $elShowProjs.html(projects.join(''))
}

function renderProtfolioModals(){
    var projects = getProjs()
    var counter = 1
    projects = projects.map(project => {
        var num = counter++
        $(`#portfolioModal${num}`).html(`
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
              <div class="lr">
                <div class="rl"></div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-lg-8 mx-auto">
                  <div class="modal-body">
                    <!-- Project Details Go Here -->
                    <h2>${project.name}</h2>
                    <p class="item-intro text-muted">${project.title}</p>
                    <img class="img-fluid d-block mx-auto" src="img/portfolio/0${num}-${project.id}.jpg" alt="">
                    <p>${project.desc}</p>
                    <ul class="list-inline">
                      <li>Date: January 2017</li>
                      <li>Client: Threads</li>
                      <li>Category: Illustration</li>
                    </ul>
                    <button class="btn btn-primary" data-dismiss="modal" type="button">
                      <i class="fa fa-times"></i>
                      Close Project</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `)})
}