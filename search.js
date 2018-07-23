const POKECARD_SEARCH_INDEX_URL = 'https://api.pokemontcg.io/v1/cards';
// const EBAY_SEARCH_URL = 'https://api.ebay.com/buy/browse/v1/item_summary/search';
const EBAY_SEARCH_URL = 'http://svcs.ebay.com/services/search/FindingService/v1';
// //working TCG API search

function getDataFromPokemonApi(searchTerm, callback) {
  const settings = {
    url: POKECARD_SEARCH_INDEX_URL,
    data: {
      name: `${searchTerm}`
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}

  function getDataFromEbayApi(searchTerm, callback) {
//   // console.log('api called');
//   // const query = {
//   //   name: `${searchTerm}`
//   // }
//   // $.getJSON(POKECARD_SEARCH_INDEX_URL, query, callback);


const EBAY_SEARCH_URL = 'http://svcs.ebay.com/services/search/FindingService/v1';

  const settings = {
    url: EBAY_SEARCH_URL,
    data: {
      "OPERATION-NAME": 'findItemsByKeywords',
      "SERVICE-VERSION": "1.0",
      "GLOBAL-ID": "EBAY-US",
      keywords: `${searchTerm}`,
      "SECURITY-APPNAME": "ChrisMag-pokesear-PRD-48bb65212-9e1a0bc9",
      "RESPONSE-DATA-FORMAT": "json",
      callback: "_cb_findItemsByKeywords",
      'paginationInput.entriesPerPage': 3
    },    
    dataType: 'jsonp',
    type: 'GET',
    success: callback
  }
  $.ajax(settings);
}

function renderResult(result) {
  // console.log(result);
  const cardInfo = `${result.name} ${result.id}`
  const htmlDiv = `
    <div class="js-card-result" id="${cardInfo}">
      <h2>
      ${result.name}
      <img src="${result.imageUrl}"/>
      </h2>
    </div>
  `;
  return htmlDiv;
      // </a> by <a class="js-channel-name" href="https://www.POKECARD.com/channel/${result.snippet.channelId}"> ${result.snippet.channelTitle}</a>
}

// function renderPageButtons(){
//   return `    
//   <a href="#" class="previous hidden">&laquo; Previous</a>
//   <a href="#" class="next">Next &raquo;</a>
//   `
// }

// function PageCountPlusOne() {
//   pageCount++;
// }

// function emptySearchForm(){
//   $('.js-search-page-button').empty();
//   $('.js-search-results').empty();
// }

function displayEbaySearchData(data) {
  console.log(data);
  console.log(data.findItemsByKeywordsResponse["0"].searchResult[0].item);
}

function displayPOKECARDSearchData(data) {
  console.log(data);
  const results = data.cards.map((item, index) => renderResult(item));
  // $('.js-search-page-button').html(renderPageButtons());
  // handleNextButton(data);
  // handlePrevButton(data);
  // displayPrevButton();
  $('.js-search-results').html(results);
  handleImageClick();
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    getDataFromPokemonApi(getSubmitValue(), displayPOKECARDSearchData);
    getDataFromEbayApi(getSubmitValue(), displayEbaySearchData);
  });
}

function getSubmitValue(){
  return $('.js-query').val();
}

function handleImageClick() {
	console.log("line 108 called")
  $('.js-card-result').on('click', event => {
    $('.js-search-results > *').addClass('hidden');
    console.log('image clicked');
  });
}

// function pageCountMinusOne(){
//   pageCount--;
// }

// function handleNextButton(data) {
//   $('.next').on('click', event => {
//     event.preventDefault();
//     emptySearchForm();
//     const pageTokenArg = data.nextPageToken
//     getDataFromApi(getSubmitValue(), displayPOKECARDSearchData, pageTokenArg);
//     PageCountPlusOne();
//   });
// }

// function displayPrevButton() {
//   const $prevBtn = $('a.previous');
//   if (pageCount < 1) {
//   $prevBtn.addClass('hidden');
//   }
//   else {
//   $prevBtn.removeClass('hidden');
//   }
// }

// function handlePrevButton(data) {
//   $('.previous').on('click', event => {
//     pageCountMinusOne();
//     const pageTokenArg = data.prevPageToken;
//     getDataFromApi(getSubmitValue(), displayPOKECARDSearchData, pageTokenArg);
//     displayPrevButton();
//     });
// }

$(watchSubmit);
