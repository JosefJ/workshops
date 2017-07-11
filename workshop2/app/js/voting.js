/**
 * Created by buben42 on 07.07.2017.
 */

// option pool



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
    var options = [];
    $('#options').find('table > tbody > tr').each(function(){
        if (!$(this).hasClass('ignore')) {
           options.push($(this).find('input').val());
        }
    })
    return options;
}

// send voting

function startNewBallot() {
    name = $('#name input[type="text"]').val();
    description = $('#descriptions textarea[name="description"]').val();
    options = collectOptions();
    publicVoting = $('input[name=openness]:checked', '#openness').val();
    participants = $('textarea[name=participants]', '#voters').val().split('\n');
    votingTemplate.deploy(name, description, options, publicVoting, participants)
}
