module.exports = {
    locals: {
        profile: { id: 1, login: 'videot4pe', email: 'videot4pe@gmail.com', display_name: 'videot4pe', phone: '89999999999', first_name: 'Alexandr', second_name: 'Kvasnikov', avatar: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Thom_Yorke_-_Tomorrow%27s_Modern_Boxes_album_artwork.jpg' },
        persons: [
            {id: 2, login: 'reckoner', unread: 2, avatar: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Thom_Yorke_-_Tomorrow%27s_Modern_Boxes_album_artwork.jpg'}, 
            {id: 3, login: 'weirdfish', unread: 1, avatar: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Thom_Yorke_-_Tomorrow%27s_Modern_Boxes_album_artwork.jpg'}, 
            {id: 4, login: 'decksdark', unread: 0, avatar: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Thom_Yorke_-_Tomorrow%27s_Modern_Boxes_album_artwork.jpg'}, 
        ],
        getMessages: (userId) => {
            // if (userId) {
                return [
                    {self: true, avatar: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Thom_Yorke_-_Tomorrow%27s_Modern_Boxes_album_artwork.jpg', text: 'Привет', time: '13:01', date: '23.05.2021'}, 
                    {self: false, avatar: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Thom_Yorke_-_Tomorrow%27s_Modern_Boxes_album_artwork.jpg', text: 'Хелоу!', time: '12:43', date: '24.05.2021'}
                ]
            // } else {
                // return []
            // }
        }
    }
  };