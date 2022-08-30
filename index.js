const quoteContainer = document.getElementById("qoute-container")
const quoteText = document.getElementById("qoute")
const authorText = document.getElementById("author")
const newQuotesBtn = document.getElementById("new-qoute")
const loader = document.getElementById("loader")

let apiQuotes = []

const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const hideLoadingSpinner = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

const getQuotes = async () => {
    showLoadingSpinner()
    const apiUrl = "https://type.fit/api/quotes"

    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();

        newQuote()
    }catch(err){
        console.log(err)
    }
}

const getQuoteDetails = () => {
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)]

    if(quote.text.length>100){
        quoteText.classList.add("long-quote")
    }else{
        quoteText.classList.remove("long-quote")
    }
    quoteText.textContent = quote.text;
    if(!quote.author){
        authorText.textContent = 'Unknown'
    }else{
        authorText.textContent = quote.author
    }

    hideLoadingSpinner()
}
const newQuote = () => {
    showLoadingSpinner()

    setTimeout(()=>getQuoteDetails(),200)
    
}

getQuotes()

newQuotesBtn.addEventListener("click",newQuote)
