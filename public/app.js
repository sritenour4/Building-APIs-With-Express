$('#add-chirp').click(e => {
    e.preventDefault();
    const user = $('#user').val();
    const message = $('#message').val();

    console.log({ user, message });

    $.ajax({
        type: 'POST',
        url: '/api/chirps',
        data: { user, message }
    })
        .then(response => {
            console.log(response);
            getAndDisplayChirps();
        });

    $('#user').val('');
    $('#message').val('');
});

getAndDisplayChirps();

function getAndDisplayChirps() {
    $.ajax({
        type: 'GET',
        url: '/api/chirps'
    })
        .then(chirpItems => {
            $('#container').empty();

            for (const id in chirpItems) {
                if (id === 'nextid') return;

                const deleteBtn = $('<button>Delete Chirp</button>').click(() => {
                    $.ajax({
                        type: 'DELETE',
                        url: `/api/chirps/${id}`
                    })
                        .then(response => {
                            console.log(response);
                            getAndDisplayChirps();
                        });
                });

                $(`
            <div>
            <div><b>${chirpItems[id].user}</b></div>
            <div>${chirpItems[id].message}</div>
            </div>
            `).appendTo('#container')
                    .append(deleteBtn);
            }
        });
}