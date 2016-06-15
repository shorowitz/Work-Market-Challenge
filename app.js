var resume = "Sara Horowitz sslhorowitz@gmail.com | 818.468.5893 | Github: shorowitz | LinkedIn: sarahorowitz EXPERIENCE SKILLS METIS | DATA VISUALIZATION WITH D3.JS COURSE FULL STACK DEVELOPMENT June 2016 – Present | New York, NY • Attend part-time, 36-hour class to gain a conceptual understanding of the ﬁeld of data visualization for the web • Effectively display quantitative information using d3.js and the best methods for visual communication JavaScript • React.js • Node.js Express.js • PostgreSQL • d3.js jQuery • AJAX • Ruby • Rails CSS3 • HTML5 • SQL • Git Bash/Terminal • RSPEC • Jasmine Heroku • DigitalOcean GENERAL ASSEMBLY | WEB DEVELOPMENT IMMERSIVE January 2016 – April 2016 | New York, NY • Attended full-time, 12-week course to learn programming fundamentals, product development and both front and back-end web development • Created and deployed full stack Javascript & Ruby applications • Collaborated with other emerging developers using Github and agile methods THE SECOND SHIFT | OPERATIONS DIRECTOR/ PRODUCT MANAGER February 2015 – Present | New York, NY • Recruited to assist founders with analyzing data, standardizing processes and expanding inﬂuence amongst women re-entering the workforce in search of ﬂexible opportunities • Work with web developers to improve overall site function and efﬁciency for administrators and users, using Pivotal Tracker to document and prioritize features, bugs and chores PERFECLTY FRANK, INC. | OPERATIONS MANAGER March 2013 – February 2015 | New York, NY (Remote) • Coordinated with new and existing clients to analyze strengths and weaknesses of restaurants, bars, hotels, spas, and/or ﬁtness studios in New York, Miami and Los Angeles, and designed industry-speciﬁc reports to ensure results would help companies gain competitive advantage • Designed 60-minute new shopper training presentations on how to conduct client visits, and created 24-page editor manual and supplemental materials to establish standardized processes and procedures for freelance editors CITRIX SYSTEMS, INC. | ASSOCIATE TECHNICAL WRITER/ INFORMATION DEVELOPER July 2012 – March 2013 | Fort Lauderdale, FL • Performed usability testing and identiﬁed methods to improve documentation to accurately reﬂect user experience for Desktop & Cloud Division products • Interviewed subject matter experts and collaborated with senior team members to develop plan for documenting the user experience NEW YORK UNIVERSITY, STERN SCHOOL OF BUSINESS | ASSISTANT RECRUITING COORDINATOR & ADMINISTRATIVE AIDE, DEPARTMENT OF FINANCE November 2010 – March 2012 | New York, NY • Wrote descriptions  of upcoming events and ﬁnance departmental affairs and designed marketing materials utilizing InDesign for NYU website targeting ﬁnance students, professors, and the entire NYU community • Conducted extensive research copyediting and interpreted content for 10 professors each semester • Organized annual junior faculty recruitment process by managing the online application site and assisting the Recruiting Chair in review of 200 applications WEB PROJECTS IMAGES OF THE TIMES April 2016 A Node-Express-PostgreSQL-React application that allows a guest user to view the top New York Times images of the day, and a registered user to play a caption-to-photo matching game using images and their corresponding captions from a speciﬁc New York Times section https://nyt-in-images.herokuapp.com GIT GARDEN March 2016 A Node-Express-PostgreSQL-React application for a visual representation of activity on a registered user’s favorite Github repositories. D3.js used for detailed view of repository data http://45.55.179.210 TRAIN TRAFFIC February 2016 A RESTful CRUD application for crowd-sourced NYC subway monitoring http://train-trafﬁc.herokuapp.com DYNAMITE January 2016 An in-browser, two-player, interactive jQuery game http://shorowitz.github.io/Dynamite EDUCATION NEW YORK UNIVERSITY GALLATIN SCHOOL FOR INDIVIDUALIZED STUDY May 2010 | New York, NY BA in Individualized Study: The Role of the Poetic Minor in Creative Writing";

var cleanRes = resume.replace(/ /gi,'').toLowerCase();

var chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'];

String.prototype.count = function(c) {
  var result = 0;

  for (var i = 0; i < this.length; i++) {
    if (this[i] === c) {
      result++;
    }
  }
  return result;
};

var resData = [];

for (var i = 0; i < chars.length; i++) {
  var count = cleanRes.count(chars[i]);
  var char = chars[i];
  var object = {};
  object['char'] = char.toUpperCase();
  object['count'] = count;
  resData.push(object)
};

var margin = {top: 10, right: 40, bottom: 40, left: 50};

var width = 1000 - margin.left - margin.right;

var height = 500 - margin.top - margin.bottom;

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return '<strong>'+ d.char +':</strong> <span style="color:orange"> ' + d.count + '</span>';
    })

var svg = d3.select('body')
  .append('svg')
  .attr('width', width + margin.left + margin.left)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

svg.call(tip);

var yMax = d3.max(resData, function(d) { return d.count; });

var xScale = d3.scale.ordinal()
  .domain(resData.map(function(d) { return d.char; }))
  .rangeRoundBands([50, width], 0.1);

var yScale = d3.scale.linear()
  .domain([0, yMax])
  .range([(height - 50), 0]);

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient('bottom')

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient('left')

svg.append('g')
  .attr('class','y axis')
  .attr('transform','translate(50, 0)')
  .call(yAxis)

svg.append('g')
  .attr('class','x axis')
  .attr('transform','translate(0,' + (height - 50) + ')')
  .call(xAxis)

var chart = svg.append('g')
  .selectAll('rect')
  .data(resData)
.enter().append('rect')
  .attr('class','bars')
  .attr('x', function(d) { return xScale(d.char); })
  .attr('width', xScale.rangeBand())
  .attr('y',function(d) { return yScale(d.count); })
  .attr('height', function(d) { return (height - 50) - yScale(d.count);} )
  .on('mouseover', tip.show)
  .on('mouseout', tip.hide);

svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(0,'+((height - 50)/2)+')rotate(-90)')
    .text('Frequency');

svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate('+ ((width+50)/2) +','+(height)+')')
    .text('Character');
