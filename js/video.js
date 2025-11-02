const posts = [
    {
        title: "Kalyn's Wedding Reception",
        video: `<iframe width="642" height="360" src="https://www.youtube.com/embed/NaiOJi6W1K4" title="Kalyn's Wedding Reception" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        description: "Kalyn got married!!!",
    },
    {
        title:"BYU-I Year 1 Highlights (Jan. - July 2022)",
        video:<iframe width="789" height="444" src="https://www.youtube.com/embed/_CDUlMofw0M" title="BYU I - Year 1 - Highlights" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>,
        description:"Highlights from my first semester at BYU-I. More info in the description of the video. :)",
    },
    {
        title: "6.20.22 - 6.25.22",
        video: <iframe width="876" height="492" src="https://www.youtube.com/embed/4y32_Z0OkSQ" title="June 2022 - Dunes/Chocolate Celestial Cookies/Camping" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>,
        description:"Went to the dunes for FHE, made a batch of Chocolate Celestial Cookies with Grace, had a fun time camping with some FHE brothers from the apartment below mine.",
    },
];

previews.innerHTML = `
<div class="previev">
    <h2>${posts[0], title}</h2>
    <a href="${posts[0], video}"></a>
    <p>${posts[0], description}</p>
</div>
`; 