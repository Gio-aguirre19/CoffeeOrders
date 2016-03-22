$(function(){
  var $orders=$('#orders');
  var $name=$('#name');
  var $drink=$("#drink");
  var orderTemplate = "" +
  "<li>" +
  "<p>Name: {{name}}<p>" +
  "<p>Drink: {{drink}}<p>" +
  "<button data-id='{{id}}' class='remove'>Delete</button>" +
  "</li>";
  function addOrder(order){
    $orders.prepend(Mustache.render(orderTemplate, order));
  }

  $.ajax({
    type: 'GET',
    url: 'http://rest.learncode.academy/api/user/orders-test',
    success: function(orders) {
      $.each(orders, function(i, order){
        addOrder(order);
      });
    }
  });
  $('#addOrder').on('click', function(){
    var order = {
      name: $name.val(),
      drink: $drink.val(),
    };
    if(order.name == '' && order.drink == ''){
      $name.css('border-color', "#F00");
      $drink.css('border-color', "#F00");
    }else if(order.name == ''){
      $name.css('border-color', "#F00");
    }else if(order.drink == ''){
      $drink.css('border-color', "#F00");
    }else{
      $name.css('border-color', "#000");
      $drink.css('border-color', "#000");
      $name.val('');
      $drink.val('');
      $.ajax({
        host: 'http://rest.learncode.academy',
        type: 'POST',
        url: 'http://rest.learncode.academy/api/user/orders-test',
        data: order,
        success: function(newOrder) {
          addOrder(newOrder)
        }
      });
  };
  });
  $orders.delegate('.remove', 'click', function(){
    var $li = $(this).closest('li');
    $.ajax({
      type: 'DELETE',
      url: 'http://rest.learncode.academy/api/user/orders-test/' + $(this).attr('data-id'),
      success: function(){
        $li.fadeOut(500, function(){
          $(this).remove();
        });
      }
    });
  });
});
