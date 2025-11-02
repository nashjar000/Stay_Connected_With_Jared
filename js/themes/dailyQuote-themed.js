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
        
        valentine: [
            // Love and Friendship Quotes
            {quote: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.", author: "Lao Tzu"},
            {quote: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn"},
            {quote: "Love is not about how much you say 'I love you', but how much you prove that it's true.", author: "Anonymous"},
            {quote: "A friend is someone who knows all about you and still loves you.", author: "Elbert Hubbard"},
            {quote: "Love is friendship that has caught fire.", author: "Ann Landers"},
            {quote: "Where there is love there is life.", author: "Mahatma Gandhi"},
            {quote: "The greatest happiness of life is the conviction that we are loved.", author: "Victor Hugo"},
            {quote: "Love recognizes no barriers.", author: "Maya Angelou"},
            {quote: "To love and be loved is to feel the sun from both sides.", author: "David Viscott"},
            {quote: "The best love is the kind that awakens the soul and makes us reach for more.", author: "Nicholas Sparks"},
        ],

        easter: [
            // Hope and Renewal Quotes
            {quote: "Spring is nature's way of saying, 'Let's party!'", author: "Robin Williams"},
            {quote: "The earth laughs in flowers.", author: "Ralph Waldo Emerson"},
            {quote: "No winter lasts forever; no spring skips its turn.", author: "Hal Borland"},
            {quote: "In every walk in nature, one receives far more than they seek.", author: "John Muir"},
            {quote: "Hope is the thing with feathers that perches in the soul.", author: "Emily Dickinson"},
            {quote: "Every flower is a soul blossoming in nature.", author: "Gerard De Nerval"},
            {quote: "Spring is when life's alive in everything.", author: "Christina Rossetti"},
            {quote: "The resurrection gives my life meaning and direction and the opportunity to start over no matter what my circumstances.", author: "Robert Flatt"},
            {quote: "Easter spells out beauty, the rare beauty of new life.", author: "S.D. Gordon"},
            {quote: "April hath put a spirit of youth in everything.", author: "William Shakespeare"},
        ],

        july4: [
            // Freedom and Liberty Quotes
            {quote: "Freedom is never more than one generation away from extinction.", author: "Ronald Reagan"},
            {quote: "Liberty is the breath of life to nations.", author: "George Bernard Shaw"},
            {quote: "Freedom lies in being bold.", author: "Robert Frost"},
            {quote: "The price of freedom is eternal vigilance.", author: "Thomas Jefferson"},
            {quote: "In the truest sense, freedom cannot be bestowed; it must be achieved.", author: "Franklin D. Roosevelt"},
            {quote: "America was not built on fear. America was built on courage, on imagination, and an unbeatable determination.", author: "Harry S. Truman"},
            {quote: "Freedom is nothing but a chance to be better.", author: "Albert Camus"},
            {quote: "Liberty, when it begins to take root, is a plant of rapid growth.", author: "George Washington"},
            {quote: "The Constitution only gives people the right to pursue happiness. You have to catch it yourself.", author: "Benjamin Franklin"},
            {quote: "We hold these truths to be self-evident: that all men are created equal.", author: "Declaration of Independence"},
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
            {quote: "Now this is what Thanksgiving is all about! Thanksgiving is cookies! Thanksgiving is pie filling! Thanksgiving is cole slaw!", author: "Garfield"},
            {quote: "Tomorrow's Thanksgiving. That's the day people celebrate having food by eating as much of it as possible.", author: "Garfield"},
            {quote: "It's a tradition. And you know how I LOOOVE tradition!", author: "Garfield"},
            {quote: "Oh, woe is me. I've been put on a diet, and I'm gonna die.", author: "Garfield"},
            
            // A Charlie Brown Thanksgiving
            {quote: "I can't cook a Thanksgiving dinner. All I can make is cold cereal and maybe toast", author: "Charlie Brown"},
            
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