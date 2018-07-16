const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_CHANNEL_URL = 'https://www.googleapis.com/youtube/v3/channels';
pageCount = 0;

//"UCFLqqGVE_E8G3Sn-nhKmkAQ"

function getChannelDataFromApi(searchTerm, callback, pageTokenArg = "") {
  const query = {
    q: `${searchTerm} in:name`,
    part: 'snippet',
    key: 'AIzaSyBG76HYFNhzGbBrCZPfpXUDy-nvlSGk5iQ',
    pageToken: pageTokenArg
  }
  $.getJSON(YOUTUBE_CHANNEL_URL, query, callback);
}

function getDataFromApi(searchTerm, callback, pageTokenArg = "") {
  const query = {
    q: `${searchTerm} in:name`,
    part: 'snippet',
    key: 'AIzaSyBG76HYFNhzGbBrCZPfpXUDy-nvlSGk5iQ',
    pageToken: pageTokenArg
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  return `
    <div>
      <h2>
      <a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.medium.url}" alt="video link to ${result.snippet.title}" /></h2>
      </a> by <a class="js-channel-name" href="https://www.youtube.com/channel/${result.snippet.channelId}"> ${result.snippet.channelTitle}</a>
    </div>
  `
}

function renderPageButtons(){
  return `    
  <a href="#" class="previous hidden">&laquo; Previous</a>
  <a href="#" class="next">Next &raquo;</a>
  `
}

function PageCountPlusOne() {
  pageCount++;
}

function emptySearchForm(){
  $('.js-search-page-button').empty();
  $('.js-search-results').empty();
}

function displayYoutubeSearchData(data) {
  console.log(data);
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-page-button').html(renderPageButtons());
  handleNextButton(data);
  handlePrevButton(data);
  displayPrevButton();
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.stopPropagation();
    getDataFromApi(getSubmitValue(), displayYoutubeSearchData);
  });
}

function getSubmitValue(){
    return query = $('.js-query').val();
}

function pageCountMinusOne(){
  pageCount--;
}

function handleNextButton(data) {
  $('.next').on('click', event => {
    event.preventDefault();
    emptySearchForm();
    const pageTokenArg = data.nextPageToken
    getDataFromApi(getSubmitValue(), displayYoutubeSearchData, pageTokenArg);
    PageCountPlusOne();
  });
}

function displayPrevButton() {
  const $prevBtn = $('a.previous');
  if (pageCount < 1) {
  $prevBtn.addClass('hidden');
  }
  else {
  $prevBtn.removeClass('hidden');
  }
}

function handlePrevButton(data) {
  $('.previous').on('click', event => {
    pageCountMinusOne();
    const pageTokenArg = data.prevPageToken;
    getDataFromApi(getSubmitValue(), displayYoutubeSearchData, pageTokenArg);
    displayPrevButton();
    });
}

$(watchSubmit);
