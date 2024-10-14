/**
 * THIS FILE WAS CREATED AS A MOCK database.
 * I still use this file for populating the database with few initial data
 */

let posts = [
  {
    id: "31120",
    posthead: "Whispers of the Forgotten: A Journey Through Time and Memory",
    postbody:
      "In a world where dreams intertwine with reality, a young artist discovers an ancient canvas that reveals hidden truths. As she paints, she unravels secrets of her past, leading to unexpected connections and transformative revelations.",
  },
  {
    id: "31121",
    posthead: "Echoes of Destiny: A Tale of Love, Loss, and Redemption",
    postbody:
      "In a bustling city, a mysterious bookshop holds secrets that change lives. When a curious visitor stumbles upon an enchanted novel, they embark on a magical journey that reveals hidden truths and unexpected friendships.",
  },
  {
    id: "31122",
    posthead: "Chasing Shadows: The Adventure of a Lifetime Awaits You",
    postbody:
      "In a small village, an ancient legend awakens when a forgotten artifact is discovered. As the townspeople uncover its mysteries, they must confront their fears and unite to protect their home from an impending darkness.",
  },
  {
    id: "31123",
    posthead: "Fragments of Time: Unraveling the Threads of Fate and Memory",
    postbody:
      "Amidst a raging storm, a shipwrecked sailor finds refuge on a mysterious island. As he explores its hidden wonders, he encounters mythical creatures and uncovers a long-lost civilization, forever changing his understanding of survival and hope.",
  },
  {
    id: "31124",
    posthead: "Beyond the Horizon: A Quest for Truth and Adventure",
    postbody:
      "In a forgotten library, a young scholar discovers a map leading to a legendary treasure. As she embarks on her quest, she faces challenges that test her courage, intellect, and the bonds of friendship she holds dear.",
  },
  {
    id: "31125",
    posthead: "Starlit Dreams: A Journey Through the Cosmos and Beyond",
    postbody:
      "In a quaint café, two strangers share a table and their stories. As they connect over coffee, they reveal their dreams, fears, and the serendipitous moments that led them to this unexpected encounter, forever changing their lives.",
  },
  {
    id: "31126",
    posthead: "Veil of Secrets: Uncovering the Mysteries of the Heart",
    postbody:
      "In a world where music holds magical power, a gifted musician discovers an ancient melody that can heal wounds and mend broken hearts. As she shares her gift, she inspires hope and unity in a divided land.",
  },
  {
    id: "31127",
    posthead: "Threads of Fate: Weaving Stories of Love, Loss, and Hope",
    postbody:
      "In a remote village, an old storyteller captivates listeners with tales of ancient heroes. As the stories unfold, the villagers find strength in their shared history, igniting a sense of community and inspiring a new generation of dreamers.",
  },
  {
    id: "31128",
    posthead: "Chasing the Stars: A Journey Through Dreams and Reality",
    postbody:
      "In a forgotten attic, a young boy discovers a dusty trunk filled with letters from the past. As he reads each one, he uncovers family secrets and learns about love, sacrifice, and the power of connection across generations.",
  },
];

// Creat
export function addNewPost(newPost) {
  newPost.id = generatePostId().toString();
  posts.unshift(newPost);
}

// Read
export function readAllPosts() {
  return [...posts];
}

export function getPostById(postID) {
  for (const post of posts) {
    if (post.id === postID) return post;
  }
  return {
    id: "404",
    posthead: "This post does not exist",
    postbody: "Either it has been deleted or does not exist",
  };
}

// Update
export function updatePost(updatedPost) {
  const oldPost = [...posts];
  const temp = [];
  oldPost.forEach((post) => {
    if (post.id === updatedPost.id) temp.push(updatedPost);
    else temp.push(post);
  });
  posts = [...temp];
}

// Delete
export function removePost(id) {
  const oldPost = [...posts];
  const temp = oldPost.filter((post) => post.id !== id);
  posts = [...temp];
}

// general function
function generatePostId() {
  const baseID = 31120;
  let newID = baseID + posts.length;
  return newID;
}
