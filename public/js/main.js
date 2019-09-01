// deklarasi material component web
mdc.textField.MDCTextField.attachTo(document.querySelector('.TBNoPendaftaran'));
mdc.textField.MDCTextField.attachTo(document.querySelector('.TBNama'));
mdc.select.MDCSelect.attachTo(document.querySelector('.select-jurusan'));
mdc.select.MDCSelect.attachTo(document.querySelector('.select-prodi'));
mdc.textField.MDCTextField.attachTo(document.querySelector('.TBNoHP'));
mdc.textField.MDCTextField.attachTo(document.querySelector('.TBAlergi'));

// fungsi get selected item
$("#pilih_prodi li").click(function () {
    alert($(this).text()); // gets text contents of clicked li
});

$("#pilih_jurusan li").click(function () {
    alert($(this).text()); // gets text contents of clicked li
});

// coba fungsi jika field kosong
function tes() {
    if (document.getElementById('text-field-hero-input').value == '') {
        alert('Lengkapi Data');
        return false; // stop submission until textbox is not ''
    }
}

// fungsi dialog confirm
function confirm() {
    new duDialog('Anda Yakin ?', 'ini tidak dapat dikembalikan', duDialog.OK_CANCEL, {
        okText: 'OK',
        callbacks: {
            okClick: function () {
                alert('Hai')
                window.location.href = "info_bayar.html";
            },
        }
    });
}

/*==================================================================
    [ Konfirmasi Pilihan ]*/
// function konfirmasi() {
//     Swal.fire({
//         title: 'Apa anda yakin?',
//         text: "Anda tidak akan dapat mengembalikan ini!",
//         type: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'YA',
//         cancelButtonText: 'TIDAK'
//     }).then((result) => {
//         if (result.value) {
//             Swal.fire({
//                 type: 'success',
//                 title: 'Terimakasih sudah memilih',
//                 showConfirmButton: false,
//             })
//             setTimeout(function () {
//                 window.location.href = "landingpage.html";
//             }, 2000);
//         }
//     })
// }

/*==================================================================
    [ Date/Time Function]*/
// var tday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// var tmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
//     "November", "December"
// ];

// function GetClock() {
//     var d = new Date();
//     var nday = d.getDay(),
//         nmonth = d.getMonth(),
//         ndate = d.getDate(),
//         nyear = d.getFullYear();
//     var nhour = d.getHours(),
//         nmin = d.getMinutes(),
//         ap;
//     if (nhour == 0) {
//         ap = " AM";
//         nhour = 12;
//     } else if (nhour < 12) {
//         ap = " AM";
//     } else if (nhour == 12) {
//         ap = " PM";
//     } else if (nhour > 12) {
//         ap = " PM";
//         nhour -= 12;
//     }

//     if (nmin <= 9) nmin = "0" + nmin;

//     var clocktext = " " + nhour + ":" + nmin +
//         ap + "";

//     var datetext = "" + tday[nday] + ", " + tmonth[nmonth] + " " + ndate + ", " + nyear;
//     document.getElementById('clockbox').innerHTML = clocktext;
//     document.getElementById('datebox').innerHTML = datetext;
// }

// GetClock();
// setInterval(GetClock, 1000);

/*==================================================================
    [ Validate Function]*/

// (function ($) {
//     "use strict";


//     /*==================================================================
//     [ Validate ]*/
//     var input = $('.validate-input .input100');

//     $('.validate-form').on('submit', function () {
//         var check = true;

//         for (var i = 0; i < input.length; i++) {
//             if (validate(input[i]) == false) {
//                 showValidate(input[i]);
//                 check = false;
//             }
//         }

//         return check;
//     });


//     $('.validate-form .input100').each(function () {
//         $(this).focus(function () {
//             hideValidate(this);
//         });
//     });

//     function validate(input) {
//         if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
//             if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
//                 return false;
//             }
//         } else {
//             if ($(input).val().trim() == '') {
//                 return false;
//             }
//         }
//     }

//     function showValidate(input) {
//         var thisAlert = $(input).parent();

//         $(thisAlert).addClass('alert-validate');
//     }

//     function hideValidate(input) {
//         var thisAlert = $(input).parent();

//         $(thisAlert).removeClass('alert-validate');
//     }



// })(jQuery);