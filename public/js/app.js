const fileInput = document.getElementById('image');
const imageLabel = document.getElementById('imageLabel');
const srcImage = document.getElementById('srcImage');
const modalBtns = document.querySelectorAll('.modalBtn');
const postId = document.getElementById('postId');
const avatar = document.getElementById('avatar');
const defImage = document.getElementById('defImage');
const avataLabel = document.getElementById('avatar-label');
const avatarImage = document.getElementById('avatar-image');

if (modalBtns && postId) {
    Array.from(modalBtns).forEach(modalBtn => {
        modalBtn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            postId.value = id;
        })
    })
}

if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        const base64 = await fileReader(file);
        srcImage.src = base64;
        srcImage.alt = file.name;
        imageLabel.classList.add('active');
    })
}

if (avatar && avataLabel) {
    avatar.addEventListener('change', async (e) => {
        const base64Str = await fileReader(e.target.files[0]);
        const imageId = document.getElementById('imageId')
        console.log(imageId)
        if (!imageId) {
            const img = document.createElement('img');
            img.id = 'imageId';
            img.src = base64Str;
            avataLabel.insertAdjacentElement('afterbegin', img)
        } else {
            imageId.src = base64Str;
        }
        avataLabel.classList.add('active')
        if (avatarImage) {
            avatarImage.remove();
        }
    })
}

const fileReader = (file) => {
    const response = new Promise(resolve => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        }

        reader.readAsDataURL(file);
    })
    return response;
}

