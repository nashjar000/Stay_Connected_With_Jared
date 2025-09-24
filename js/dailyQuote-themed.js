// Theme-aware Daily Quote System
document.addEventListener("DOMContentLoaded", function () {
    const allQuotes = {
        normal: [
            // Doctor Who
            { quote: "Nine hundred years of time and space and I've never met someone who wasn't important.", author: "The Doctor" },
            { quote: "Everything's got to end sometime. Otherwise, nothing would ever get started.", author: "The Doctor" },
            {quote: "We all change, when you think about it. We're all different people through our lives. And that's okay, that's good, you gotta keep moving, so long as you remember all the people that you used to be.", author: "The Doctor"},
            {quote: "The name I choose is the Doctor. The name you choose it's like, it's like a promise you make.", author: "The Doctor"},
            {quote: "I'll be a story in your head. But that's OK: We're all stories, in the end. Just make it a good one, eh? Because it was, you know, it was the best: A daft old man, who stole a magic box and ran away.", author: "The Doctor"},

            // Harry Potter
            {quote: "My philosophy is that worrying means you suffer twice.", author: "Newt Scamander"},
            {quote: "Even if we make mistakes, the terrible things, we can try to make things right.", author: "Newt Scamander"},
            {quote: "Happiness can be found, even in the darkest of times, if one only remembers to turn on the light", author: "Albus Dumbledore"},
            {quote: "My mum has always said things we loose have a way of coming back to us in the end. If not always in the way we expect.", author: "Luna Lovegood"},
            {quote: "You're just as sane as I am.", author: "Luna Lovegood"},
            {quote: "Being different isn't a bad thing. It means you're brave enough to be yourself", author: "Luna Lovegood"},

            // Famous People in History
            {quote: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison"},

            // Back to the Future
            {quote: "...your future hasn't been written yet. No one's has. Your future is whatever you make it. So make it a good one...", author: "Doc Brown"},

            // LotR & Hobbit
            {quote: "I have found it is the small things, everyday deeds of ordinary folk, that keeps the darkness at bay. Simple acts of kindness and love.", author: "Gandalf"},
            {quote: "I don't know half of you half as well as I should like and I like less than half of you half as well as you deserve!", author: "Bilbo Baggins"},
            {quote: "I am going on an adventure!", author: "Bilbo Baggins"},
        ],
        
        halloween: [
            // Charlie Brown:
            {quote: "On Halloween night, the Great Pumpkin rises from his pumpkin patch and flies through the air with his bag of toys to all the children.", author: "Linus"},
            {quote: "Never jump into a pile of leaves with a wet sucker.", author: "Linus"},

            // Garfield:
            {quote: "That's right, kids! Tonight is Halloween night, and we want to be in great shape to trick-or-treat for all that candy, DOOOOOOOOOON'T WE?", author:"Binky the Clown"},
            {quote: "If we can make it across the river, the candy is all mine, do you hear me? ALL MINE! Ah, wait a minute. Am I being too greedy? Should I share my candy with those less fortunate than me? Am I missing the spirit of Halloween? Nah. All mine! Mine, I tell you!", author: "Garfield"},
            {quote: "My boat's gone, my candy's gone, dead pirates are coming any minute, it's past my bedtime. I wanna go home.", author: "Garfield"},

            // Haunted Mansion:
            {quote:"Hey, honey, you know they have dead people in the backyard?", author: "Jim Evers"},

            // Nightmare Before Christmas
            {quote:"Eureka! This year, Christmas will be ours!", author:"Jack Skellington"},
            {quote:"What's this? What's this? There's color everywhere!", author:"Jack Skellington"},
            {quote:"And since I am dead, I can take off my head to recite Shakespearean quotations.", author:"Jack Skellington"},
        ],
        
        thanksgiving: [
            // Garfield's Thanksgiving
            {quote: "I hate Mondays, but I love Thanksgiving dinner!", author: "Garfield"},
            {quote: "Thanksgiving is the one day of the year when it's socially acceptable to eat until you can't move.", author: "Garfield"},
            {quote: "I'm thankful for lasagna, and more lasagna.", author: "Garfield"},
            {quote: "The only thing better than one turkey dinner is two turkey dinners.", author: "Garfield"},
            {quote: "Diet? What diet? It's Thanksgiving!", author: "Garfield"},
            
            // A Charlie Brown Thanksgiving
            {quote: "What if, today, we were grateful for everything?", author: "Charlie Brown"},
            {quote: "Sometimes I lie awake at night and ask 'Why me?' Then a voice answers 'Nothing personal, your name just happened to come up.'", author: "Charlie Brown"},
            {quote: "In the book of life, the answers aren't in the back.", author: "Charlie Brown"},
            {quote: "I think there must be something wrong with me, Linus. Christmas is coming, but I'm not happy.", author: "Charlie Brown"},
            {quote: "Don't worry about the world coming to an end today. It's already tomorrow in Australia.", author: "Charlie Brown"},
            
            // Snoopy's Thanksgiving wisdom
            {quote: "Sometimes I lie awake at night, and I ask, 'Where have I gone wrong?' Then a voice says to me, 'This is going to take more than one night.'", author: "Snoopy"},
            {quote: "Yesterday I was a dog. Today I'm a dog. Tomorrow I'll probably still be a dog. Sigh! There's so little hope for advancement.", author: "Snoopy"},
            
            // General Thanksgiving & Gratitude 
            {quote: "Gratitude is not only the greatest of virtues, but the parent of all others.", author: "Cicero"},
            {quote: "Be thankful for what you have; you'll end up having more.", author: "Oprah Winfrey"},
            {quote: "Give thanks not just on Thanksgiving Day, but every day of your life.", author: "Catherine Pulsifer"},
        ],
        
        christmas: [
            // Elf
            {quote:"The best way to spread Christmas cheer is singing loud for all to hear", author:"Buddy The Elf"},
            {quote:"We elves try to stick to the four main food groups: Candy, candy canes, candy corn, and syrup.", author:"Buddy The Elf"},
            {quote:"Buddy the Elf, what's your favorite color?", author:"Buddy The Elf"},

            // The Grinch
            {quote:"Now you listen to me, young lady! Even if we're horribly mangled, there'll be no sad faces on Christmas.", author:"The Grinch"},

            // Miracle on 34th Street
            {quote:"Faith is believing in things when common sense tells you not to.", author:"Fred Gailey"},
            {quote:"Oh, Christmas isn't just a day, it's a frame of mind.", author:"Kris Kringle"},

            // The Polar Express
            {quote:"Just remember, the true spirit of Christmas lies in your heart.", author:"Santa Claus"},
            {quote:"Try your other pocket!", author:"Train Conductor"},

            // Garfield Christmas
            {quote:"Christmas, it's not the giving, it's not the getting, it's the loving", author:"Garfield"}
        ]
    };
    
    function getCurrentQuotes() {
        const currentTheme = window.currentTheme || 'normal';
        return allQuotes[currentTheme] || allQuotes.normal;
    }
    
    const quoteContainer = document.getElementById("quote-container");
    const quoteElement = document.getElementById("quote");
    const authorElement = document.getElementById("author");
    
    let quotes = getCurrentQuotes();
    let shuffledQuotes = shuffleArray(quotes);
    let currentQuoteIndex = 0;
    
    // Listen for theme changes
    window.addEventListener('themeChanged', function() {
        quotes = getCurrentQuotes();
        shuffledQuotes = shuffleArray(quotes);
        currentQuoteIndex = 0;
        generateRandomQuote(); // Show new quote immediately when theme changes
    });
    
    // Initial quote generation with typing animation
    generateRandomQuote();
    
    function generateRandomQuote() {
        const randomQuote = shuffledQuotes[currentQuoteIndex];
        
        changeAuthor(randomQuote.author, () => {
            typeOutQuote(randomQuote.quote, quoteElement, () => {
                setTimeout(generateNextQuote, 15000); // Wait for 15 seconds before generating the next quote
            });
        });
    }
    
    function generateNextQuote() {
        currentQuoteIndex = (currentQuoteIndex + 1) % shuffledQuotes.length; // Move to the next quote, loop if necessary
        generateRandomQuote();
    }
    
    function changeAuthor(newAuthor, callback) {
        authorElement.textContent = "- " + newAuthor;
        setTimeout(callback, 300); // Wait a bit before proceeding to typing out the quote
    }
    
    function typeOutQuote(text, element, callback) {
        element.textContent = ""; // Clear the element
        let index = 0;
        
        function type() {
            if (index === 0) {
                element.textContent += '"';
            }
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                setTimeout(type, 50); // Adjust typing speed here (in milliseconds)
            } else if (index === text.length) {
                element.textContent += '"';
                // Cursor animation
                setTimeout(() => {
                    element.innerHTML += '<span class="cursor">|</span>';
                    callback();
                }, 300); // Delay after typing is complete before showing cursor
            }
        }
        
        type();
    }

    function shuffleArray(array) {
        const shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }
});