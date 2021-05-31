// In this file you can create your own custom view templates


// A view template is a function that returns a view,
// this functions gets some config (e.g. trial_data, name, etc.) information as input
// A view is an object, that has a name, CT (the counter of how many times this view occurred in the experiment),
// trials the maximum number of times this view is repeated
// and a render function, the render function gets CT and the magpie-object as input
// and has to call magpie.findNextView() eventually to proceed to the next view (or the next trial in this view),
// if it is an trial view it also makes sense to call magpie.trial_data.push(trial_data) to save the trial information

// const slider_rating = function (config) {
//   const view = {
//     name: config.name,
//     CT: 0,
//     trials: config.trials,
//     // The render functions gets the magpie object as well as the current trial in view counter as input
//     render: function (CT, magpie) {
//       let response;
//       let rating;
//       $("main")
//         .html(
//             `<div class='magpie-view-answer-container'>
//                     <br>
//                     <p class='magpie-view-question'><font size = 3 color = "gray">You overhear the following statement:</font><br><font size = 5>${config.data[CT].QUD}</font></p>
//                     <p class='magpie-view-question'><font size = 4 color = "gray">${config.data[CT].question}</font></p>
//                     <input type='radio' name='response' id='o1'style='display:none' value="${config.data[CT].option1}" />
//                     <label for='o1' class='magpie-response-buttons'>${config.data[CT].option1}</label>
//                     <input type='radio' name='response' id='o2' style='display:none' value="${config.data[CT].option2}" />
//                     <label for='o2' class='magpie-response-buttons'>${config.data[CT].option2}</label><br><br><br><br>
//             </div>
//             <div id='part2b' class='magpie-view-answer-container magpie-nodisplay'>
//                         <p id='part2a' class='magpie-view-question magpie-nodisplay'><font size = 4 color = "gray">How confident are you of your choice?</font></p>
//                         <strong class='magpie-response-rating-option magpie-view-text'>${config.optionLeft}</strong>
//                         <input type="radio" name="rating" id="1" style='display:none' value="1" />
//                         <label for="1" class='magpie-response-rating'>1</label>
//                         <input type="radio" name="rating" id="2" style='display:none' value="2" />
//                         <label for="2" class='magpie-response-rating'>2</label>
//                         <input type="radio" name="rating" id="3" style='display:none' value="3" />
//                         <label for="3" class='magpie-response-rating'>3</label>
//                         <input type="radio" name="rating" id="4" style='display:none' value="4" />
//                         <label for="4" class='magpie-response-rating'>4</label>
//                         <input type="radio" name="rating" id="5" style='display:none' value="5" />
//                         <label for="5" class='magpie-response-rating'>5</label>
//                         <input type="radio" name="rating" id="6" style='display:none' value="6" />
//                         <label for="6" class='magpie-response-rating'>6</label>
//                         <input type="radio" name="rating" id="7" style='display:none' value="7" />
//                         <label for="7" class='magpie-response-rating'>7</label>
//                         <strong class='magpie-response-answer-option magpie-view-text'>${config.optionRight}</strong>
//             </div>
//             <button id="next" class='magpie-view-button magpie-nodisplay'>Next</button>`
//         );
//
//
//
//       // Here, you can do whatever you want, eventually you should call magpie.findNextView()
//       // to proceed to the next view and if it is an trial type view,
//       // you should save the trial information with magpie.trial_data.push(trial_data)
//       /*const handle_response = function(config, CT, magpie, answer_container_generator, startingTime) {    */
//       //                $(".magpie-view").append(answer_container_generator(config, CT));
//
//       $("input[name=response]")
//         .on("change", function () {
//           //                    const RT = Date.now() - startingTime; // measure RT before anything else
//           response = $("input[name=response]:checked").val();
//           $("input[name=response]:checked").css('border', '#8b0000');
//           //                    document.getElementById(response).style.border="6px solid black";
//           $("#part2a")
//             .removeClass("magpie-nodisplay");
//           $("#part2b")
//             .removeClass("magpie-nodisplay");
//         });
//
//       /*$('#o1').on("click", handle_click);
//       $('#o2').on("click", handle_click);
//       */
//       // attaches an event listener to the yes / no radio inputs
//       // when an input is selected a response property with a value equal
//       // to the answer is added to the trial object
//       // as well as a readingTimes property with value
//       $("#part2b")
//         .on("change", function () {
//           rating = $("input[name=rating]:checked")
//             .val(); // MF the name of the form is 'rating'
//           $("#next")
//             .removeClass("magpie-nodisplay");
//         });
//
//       $("#next")
//         .on("click", function () {
// //          const RT = Date.now() - startingTime;
//           let trial_data = {
//             trial_name: config.name,
//             trial_number: CT + 1,
//             response: response,
//             rating: rating
//           };
//
//           trial_data = magpieUtils.view.save_config_trial_data(config.data[CT], trial_data);
//
//           magpie.trial_data.push(trial_data);
//           magpie.findNextView();
//         });
//       //            }
//     }
//   };
//   // We have to return the view, so that it can be used in 05_views.js
//   return view;
// };
