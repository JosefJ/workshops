/**
 * Created by buben42 on 07.07.2017.
 */

// option pool

var options = [];

$('.delete').on('click', function(){
    $(this).closest('tr').remove();
});

$('.add').on('click', function(){
    option = $(this).closest('tr').find('input').val();
    var newOption = '<tr> <td> <input type="text" value="'+ option +'"> <button class="delete"> delete </button></td></tr>';
    $(this).closest('tr').before(newOption);

    $('.delete').on('click', function(){
        $(this).closest('tr').remove();
    });
});

// collect all options to option pool variable
function collectOptions() {
    $('#options').find('table > tbody > tr').each(function(){
        if (!$(this).hasClass('ignore')) {
           options.push($(this).find('input').val());
        }
    })
}