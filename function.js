let globalArr = [
  {
    by: "norvig",
    id: 2921983,
    kids: [2922097, 2922429, 2924562],
    parent: 2921506,
    text: "Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
    time: 1314211127,
    type: "comment",
  },
  {
    by: "pchristensen",
    id: 2922097,
    kids: [2923189],
    parent: 2921983,
    text: "Deal.  You promise?<p>Since you're here, what do you feel like is a bigger constraint for Google (or the worldwide technical economy) - software engineering discipline or computer science fundamentals?  I understand that you work in research, but for a hugely profitable company, so you have the insight to give a good answer.",
    time: 1314213033,
    type: "comment",
  },
  {
    by: "norvig",
    id: 2923189,
    parent: 2922097,
    text: "Promise.<p>Good question.  I think the engineering discipline part is much harder. I'm not sure that is because the problems really <i>are</i> harder: messier, ill-defined, changing over time; or whether it is that the academic community has focused on more well-defined formal/fundamental questions and mostly nailed them, so what we're left with is the harder messier stuff.  Certainly it is easier for me to find someone to hire fresh out of college who has excellent CS fundamentals than to find someone with strong engineering discipline.  And while my title included \"Research\", we all work very closely with Engineering.",
    time: 1314230753,
    type: "comment",
  },
  {
    by: "pstuart",
    id: 2922429,
    parent: 2921983,
    text: "Having no formal CS education (I consider myself a coder, not a programmer) I found your spell checker example to be intimidatingly beautiful. It feels like learning to play guitar and hearing Hendrix play: it's fun to do it but kind of depressing knowing I'll never come close.",
    time: 1314218807,
    type: "comment",
  },
  {
    by: "pstuart",
    id: 2924562,
    parent: 2921983,
    text: "Having no formal CS education (I consider myself a coder, not a programmer) I found your spell checker example to be intimidatingly beautiful. It feels like learning to play guitar and hearing Hendrix play: it's fun to do it but kind of depressing knowing I'll never come close.",
    time: 1314273417,
    type: "comment",
  },
];
let inputInfo = {
  by: "norvig",
  id: 2921983,
  kids: [2922097, 2922429, 2924562],
  parent: 2921506,
  text: "Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
  time: 1314211127,
  type: "comment",
};

let outputInfo = {
  by: "norvig",
  id: 2921983,
  kids: [2922097, 2922429, 2924562],
  parent: 2921506,
  text: "Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
  time: 1314211127,
  type: "comment",
  comments: [
    {
      by: "pchristensen",
      id: 2922097,
      kids: [2923189],
      parent: 2921983,
      text: "Deal.  You promise?<p>Since you're here, what do you feel like is a bigger constraint for Google (or the worldwide technical economy) - software engineering discipline or computer science fundamentals?  I understand that you work in research, but for a hugely profitable company, so you have the insight to give a good answer.",
      time: 1314213033,
      type: "comment",
      comments: [
        {
          by: "norvig",
          id: 2923189,
          parent: 2922097,
          text: "Promise.<p>Good question.  I think the engineering discipline part is much harder. I'm not sure that is because the problems really <i>are</i> harder: messier, ill-defined, changing over time; or whether it is that the academic community has focused on more well-defined formal/fundamental questions and mostly nailed them, so what we're left with is the harder messier stuff.  Certainly it is easier for me to find someone to hire fresh out of college who has excellent CS fundamentals than to find someone with strong engineering discipline.  And while my title included \"Research\", we all work very closely with Engineering.",
          time: 1314230753,
          type: "comment",
        },
      ],
    },
    {
      by: "pstuart",
      id: 2922429,
      parent: 2921983,
      text: "Having no formal CS education (I consider myself a coder, not a programmer) I found your spell checker example to be intimidatingly beautiful. It feels like learning to play guitar and hearing Hendrix play: it's fun to do it but kind of depressing knowing I'll never come close.",
      time: 1314218807,
      type: "comment",
      comments: [],
    },
    {
      by: "pstuart",
      id: 2924562,
      parent: 2921983,
      text: "Having no formal CS education (I consider myself a coder, not a programmer) I found your spell checker example to be intimidatingly beautiful. It feels like learning to play guitar and hearing Hendrix play: it's fun to do it but kind of depressing knowing I'll never come close.",
      time: 1314273417,
      type: "comment",
      comments: [],
    },
  ],
};
// @param {number} id
// @return {object}
function expandComment(id) {
  let comment = globalArr.find((item) => item.id === id);
  if (comment.kids) {
    comment.comments = comment.kids.map((item) => expandComment(item));
  }
  return comment;
}
console.log(expandComment(2921983));
