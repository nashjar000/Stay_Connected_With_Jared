document.addEventListener("DOMContentLoaded", function () {
    const quotes = [
      // Doctor Who
      { quote: "Nine hundred years of time and space and I've never met someone who wasn't important.", author: "The Doctor" },
      { quote: "Everything's got to end sometime. Otherwise, nothing would ever get started.", author: "The Doctor" },
      {quote: "We all change, when you think about it. We're all different people through our lives. And that's okay, that's good, you gotta keep moving, so long as you remember all the people that you used to be.", author: "The Doctor"},
      {quote: "The name I choose is the Doctor. The name you choose it's like, it's like a promise you make.", author: "The Doctor"},
      {quote: "I'll be a story in your head. But that's OK: We're all stories, in the end. Just make it a good one, eh? Because it was, you know, it was the best: A daft old man, who stole a magic box and ran away.", author: "The Doctor"},

      // // Church leaders
      // {quote:"How can I tell when I’m being prompted by the Spirit?…Quit worrying about it. Quit fussing with it. Quit analyzing it. You be a good boy, you be a good girl, you honor your covenants, you keep the commandments; and I promise you in the name of the Lord Jesus Christ that as you press forward with faith in Christ, your footsteps will be guided. As you open your mouth, it will be filled, and you will be where you need to be, and most of the time, you will not even have any idea how you got there.", author:"Elder David A. Bednar"},

      // // Harry Potter
      {quote: "My philosophy is that worrying means you suffer twice.", author: "Newt Scamander"},
      {quote: "Even if we make mistakes, the terrible things, we can try to make things right.", author: "Newt Scamander"},

      {quote: "Happiness can be found, even in the darkest of times, if one only remembers to turn on the light", author: "Albus Dumbledore"},

      {quote: "My mum has always said things we loose have a way of coming back to us in the end. If not always in the way we expect.", author: "Luna Lovegood"},
      {quote: "You're just as sane as I am.", author: "Luna Lovegood"},
      {quote: "Being different isn't a bad thing. It means you're brave enough to be yourself", author: "Luna Lovegood"},
      {quote: "Well if I were You-Know-Who, I’d want you to feel cut off from everyone else. Because if it’s just you alone you’re not as much of a threat.", author: "Luna Lovegood"},

      // // Famous People in History
      {quote: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison"},

      // // Back to the Future
      {quote: "...your future hasn't been written yet. No one's has. Your future is whatever you make it. So make it a good one...", author: "Doc Brown"},

      // // LotR & Hobbit
      {quote: "I have found it is the small things, everyday deeds of ordinary folk, that keeps the darkness at bay. Simple acts of kindness and love.", author: "Gandalf"},

      {quote: "I don't know half of you half as well as I should like and I like less than half of you half as well as you deserve!", author: "Bilbo Baggins"},
      {quote: "I am going on an adventure!", author: "Bilbo Baggins"},

      // Halloween Quotes:
      // Charlie Brown:
      // {quote: "On Halloween night, the Great Pumpkin rises from his pumpkin patch and flies through the air with his bag of toys to all the children.", author: "Linus"},
      // {quote: "Never jump into a pile of leaves with a wet sucker.", author: "Linus"},

      // // Garfield:
      // {quote: "That's right, kids! Tonight is Halloween night, and we want to be in great shape to trick-or-treat for all that candy, DOOOOOOOOOON'T WE?", author:"Binky the Clown"},
      // {quote: "If we can make it across the river, the candy is all mine, do you hear me? ALL MINE! Ah, wait a minute. Am I being too greedy? Should I share my candy with those less fortunate than me? Am I missing the spirit of Halloween? Nah. All mine! Mine, I tell you!", author: "Garfield"},
      // {quote: "My boat's gone, my candy's gone, dead pirates are coming any minute, it's past my bedtime. I wanna go home.", author: "Garfield"},

      // // Haunted Mansion:
      // {quote:"Hey, honey, you know they have dead people in the backyard?", author: "Jim Evers"},

      // // Nightmare Before Christmas
      // {quote:"Eureka! This year, Christmas will be ours!", author:"Jack Skellington"},

      // Christmas
      // {quote:"The best way to spread Christmas cheer is singing loud for all to hear", author:"Buddy The Elf"},
      // {quote:"We elves try to stick to the four main food groups: Candy, candy canes, candy corn, and syrup.", author:"Buddy The Elf"},
      // {quote:"Buddy the Elf, what’s your favorite color?", author:"Buddy The Elf"},

      // {quote:"Now you listen to me, young lady! Even if we’re horribly mangled, there’ll be no sad faces on Christmas.", author:"The Grinch"},

      // {quote:"Faith is believing in things when common sense tells you not to.", author:"Fred Gailey"},
      // {quote:"Oh, Christmas isn’t just a day, it’s a frame of mind.", author:"Kris Kringle"},

      // {quote:"Just remember, the true spirit of Christmas lies in hour heart.", author:"Santa Claus"},
      // {quote:"Try your other pocket!", author:"Train Conductor"},

      // {quote:"Christmas, it's not the giving, it's not the getting, it's the loving", author:"Garfield"}




      
    //   {quote: "", author: ""},
    //   {quote: "", author: ""},
    //   {quote: "", author: ""},
    //   {quote: "", author: ""},
    //   {quote: "", author: ""},
    //   {quote: "", author: ""},
    //   {quote: "", author: ""},
      // Add more quotes and authors here
    ];
  
    const quoteContainer = document.getElementById("quote-container");
    const quoteElement = document.getElementById("quote");
    const authorElement = document.getElementById("author");
    
    let shuffledQuotes = shuffleArray(quotes); // Shuffle the quotes array
    let currentQuoteIndex = 0;
    
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