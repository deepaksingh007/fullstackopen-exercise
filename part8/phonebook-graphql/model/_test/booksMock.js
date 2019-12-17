exports.booksMock = [
    {
        _id: '5de91d862d9a5e4460878970',
        genres: ['classic'],
        title: 'Best player in 70s',
        author: '5de91d862d9a5e4460878970',
        published: 1997,
        __v: 0
    },
    {
        _id: '5de91d862d9a5e4460878971',
        genres: ['classic'],
        title: 'Best player in 80s',
        author: '5de91d862d9a5e4460878971',
        published: 1997,
        __v: 0
    },
    {
        _id: '5de91d862d9a5e4460878972',
        genres: ['crime'],
        title: 'Best player in 90s',
        author: '5de91d862d9a5e4460878972',
        published: 1997,
        __v: 0
    }
]

exports.booksPopulatedMock = [
    {
        _id: '5de91d862d9a5e4460878970',
        genres: ['classic'],
        title: 'Best player in 70s',
        author: {
            _id : '5de91d862d9a5e4460878970',
            name: 'test 1',
            born: 2020,
            bookCount: 1,
            __v: 0
        },
        published: 1997,
        __v: 0
    },
    {
        _id: '5de91d862d9a5e4460878971',
        genres: ['classic'],
        title: 'Best player in 80s',
        author: {
            _id : '5de91d862d9a5e4460878970',
            name: 'test 1',
            born: 2020,
            bookCount: 1,
            __v: 0
        },
        published: 1997,
        __v: 0
    },
    {
        _id: '5de91d862d9a5e4460878972',
        genres: ['crime'],
        title: 'Best player in 90s',
        author: {
            _id : '5de91d862d9a5e4460878971',
            name: 'test 2',
            born: 2020,
            bookCount: 1,
            __v: 0
        },
        published: 1997,
        __v: 0
    }
]