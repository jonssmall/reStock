$.ajax({
    url: `/api/stocks`,
    cache: false,
    dataType: 'json'
}).done(function(res) {
    alert('done');
    console.log(res);
});