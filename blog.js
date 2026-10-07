const STORAGE_KEY = "simpleBlogPosts";

let posts = loadPosts();

// ---------- Storage ----------

function loadPosts() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const parsed = saved ? JSON.parse(saved) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error("Could not load posts:", error);
        return [];
    }
}

function savePosts() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (error) {
        console.error("Could not save posts:", error);
        alert("Could not save data. Storage may be full or disabled.");
    }
}

// Prevents user text from being run as HTML
function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// ---------- Actions ----------

function addPost() {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (title === "" || content === "") {
        alert("Fill all fields");
        return;
    }

    posts.push({
        title: title,
        content: content,
        comments: []
    });

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    savePosts();
    showPosts();
}

function addComment(index) {
    const input = document.getElementById("c" + index);
    const comment = input.value.trim();

    if (comment === "") {
        alert("Enter comment");
        return;
    }

    posts[index].comments.push(comment);

    savePosts();
    showPosts();
}

// ---------- Rendering ----------

function showPosts() {
    let output = "";

    for (let i = 0; i < posts.length; i++) {
        output += `
        <div class="post">
            <h2>${escapeHTML(posts[i].title)}</h2>
            <p>${escapeHTML(posts[i].content)}</p>

            <input id="c${i}" placeholder="Write comment">

            <button onclick="addComment(${i})">Comment</button>

            <div>
        `;

        for (let j = 0; j < posts[i].comments.length; j++) {
            output += `
            <p class="comment">${escapeHTML(posts[i].comments[j])}</p>
            `;
        }

        output += `
            </div>
        </div>
        `;
    }

    document.getElementById("posts").innerHTML = output;
}

// Show saved posts when the page loads
showPosts();