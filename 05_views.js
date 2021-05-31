// In this file you can instantiate your views
// We here first instantiate wrapping views, then the trial views


/** Wrapping views below

* Obligatory properties

    * trials: int - the number of trials this view will appear
    * name: string

*Optional properties
    * buttonText: string - the text on the button (default: 'next')
    * text: string - the text to be displayed in this view
    * title: string - the title of this view

    * More about the properties and functions of the wrapping views - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#wrapping-views

*/

// Every experiment should start with an intro view. Here you can welcome your participants and tell them what the experiment is about
const intro = magpieViews.view_generator("intro", {
  trials: 1,
  name: 'intro',
  title: 'Welcome',
  // If you use JavaScripts Template String `I am a Template String`, you can use HTML <></> and javascript ${} inside
  text: `Thank you for participating in our study. Before starting the experiment, please read the legal information on the next page carefully.`,
  buttonText: 'Show me the legal information'
});

const legal_info = magpieViews.view_generator("intro", {
  trials: 1,
  name: 'legal_info',
  title: 'Legal information',
  // If you use JavaScripts Template String `I am a Template String`, you can use HTML <></> and javascript ${} inside
  text: `In this task, you will be asked to read short metaphoric statements presented in the absence of context and to guess what these statements might mean. Every now and then you will be asked questions about the statements. The whole experiment should take up to five minutes.
         <br />
         <br />
         The only condition on taking part is that you are <b>over 18</b>. Please follow this <a href="http://blake.ppls.ed.ac.uk/~pling/consent-vinicius.html">link</a> to read the consent form about participating in the experiment.
         <br />
         <br />
          By clicking the accept button below, you indicate that:
          <br />
          <span style="margin-left:2em">You are over 18.</span>
          <br />
          <span style="margin-left:2em">You have read the consent form.</span>
          <br />
          <span style="margin-left:2em">You voluntarily agree to participate and understand that you can stop your participation at any time.</span>
          <br />
          <span style="margin-left:2em">You agree that your <b>anonymous</b> data may be kept permanently in University of Edinburgh archives and may be used by qualified researchers for teaching and research purposes.</span>
          <br />
          <br />
          If you do not agree to all of these points, please close your browser window now.
          <br />
          <br />
          `,
  buttonText: 'Begin the experiment'
});

// For most tasks, you need instructions views
const instructions = magpieViews.view_generator("instructions", {
  trials: 1,
  name: 'instructions',
  title: 'Instructions',
  text: `In order to complete the task, each trial you will be asked to read a metaphoric statement and to rate how much you think it matches a given characteristic.`,
  buttonText: 'Proceed to task'
});


// In the post test questionnaire you can ask your participants addtional questions
const post_test = magpieViews.view_generator("post_test", {
  trials: 1,
  name: 'post_test',
  title: 'Additional information',
  text: 'Answering the following questions is optional but your answers will help us analyze our results.'

  // You can change much of what appears here, e.g., to present it in a different language, as follows:
  // buttonText: 'Weiter',
  // age_question: 'Alter',
  // gender_question: 'Geschlecht',
  // gender_male: 'männlich',
  // gender_female: 'weiblich',
  // gender_other: 'divers',
  // edu_question: 'Höchster Bildungsabschluss',
  // edu_graduated_high_school: 'Abitur',
  // edu_graduated_college: 'Hochschulabschluss',
  // edu_higher_degree: 'Universitärer Abschluss',
  // languages_question: 'Muttersprache',
  // languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
  // comments_question: 'Weitere Kommentare'
});

// The 'thanks' view is crucial; never delete it; it submits the results!
const thanks = magpieViews.view_generator("thanks", {
  trials: 1,
  name: 'thanks',
  title: 'Thank you for taking part in this experiment!',
  prolificConfirmText: 'Press the button'
});

/** trial (magpie's Trial Type Views) below

* Obligatory properties

    - trials: int - the number of trials this view will appear
    - name: string - the name of the view type as it shall be known to _magpie (e.g. for use with a progress bar)
            and the name of the trial as you want it to appear in the submitted data
    - data: array - an array of trial objects

* Optional properties

    - pause: number (in ms) - blank screen before the fixation point or stimulus show
    - fix_duration: number (in ms) - blank screen with fixation point in the middle
    - stim_duration: number (in ms) - for how long to have the stimulus on the screen
      More about trial life cycle - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

    - hook: object - option to hook and add custom functions to the view
      More about hooks - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

* All about the properties of trial views
* https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#trial-views
*/


// Here, we initialize a normal forced_choice view
const slider_rating_custom = magpieViews.view_generator("slider_rating",{
  // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
  trials: 15,
  // name should be identical to the variable name
  name: 'slider_rating_custom',
  data: _.shuffle(task_trial_info.sliderRating)
  // optionLeft: "Not at all confident",
  // optionRight: "Very confident",
},
{
  stimulus_container_generator : function (config, CT) {
        return `<div class='magpie-view'>
                    <h1 class='magpie-view-title'>${config.title}</h1>
                    <p class='magpie-view-question'><font size = 3 color = "gray">You overhear the following statement:</font><br><font size = 5>${config.data[CT].QUD}</font></p>
                    <div class='magpie-view-stimulus-container'>
                        <div class='magpie-view-stimulus magpie-nodisplay'></div>
                    </div>
                </div>`;
      }
},
{
   answer_container_generator: function (config, CT) {
          const option1 = config.data[CT].optionLeft;
          const option2 = config.data[CT].optionRight;
          return `<p class='magpie-view-question'><font size = 4 color = "gray">${config.data[CT].question}</font></p>
                  <div class='magpie-view-answer-container'>
                      <span class='magpie-response-slider-option'>${option1}</span>
                      <input type='range' id='response' class='magpie-response-slider' min='0' max='100' value='50'/>
                      <span class='magpie-response-slider-option'>${option2}</span>
                  </div>
                  <button id="next" class='magpie-view-button magpie-nodisplay'>Next</button>`;
      }
});
/*{
    stimulus_container_generator: function (config, CT) {
        return `<div class='magpie-view'>
                </div>`;
    },*/
    /*answer_container_generator: function (config, CT) {
            return `<div class='magpie-view-answer-container'>
                        <h1 class='magpie-view-title'>${config.title}</h1>
                        <p class='magpie-view-question'><font size = 3 color = "gray">You overhear the following statement:</font><br><font size = 5>${config.data[CT].QUD}</font></p>
                        <p class='magpie-view-question'><font size = 4 color = "gray">${config.data[CT].question}</font></p>
                        <label for='o1' class='magpie-response-buttons'>${config.data[CT].option1}</label>
                        <input type='radio' name='answer' id='o1' value=${config.data[CT].option1} />
                        <input type='radio' name='answer' id='o2' value=${config.data[CT].option2} />
                        <label for='o2' class='magpie-response-buttons'>${config.data[CT].option2}</label>
                    </div>`
    },
    /*answer_container_generator: function (config, CT) {
            const sliderLeft = config.data[CT].optionLeft;
            const sliderRight = config.data[CT].optionRight;
            return `<div class='magpie-view-answer-container'>
                        <h1 class='magpie-view-title'>${config.title}</h1>
                        <p class='magpie-view-question'><font size = 3 color = "gray">You overhear the following statement:</font><br><font size = 5>${config.data[CT].QUD}</font></p>
                        <p class='magpie-view-question'><font size = 4 color = "gray">${config.data[CT].question}</font></p>
                        <label for='o1' class='magpie-response-buttons'>${config.data[CT].option1}</label>
                        <input class='part1' type='radio' name='answer' id='o1' value=${config.data[CT].option1} />
                        <input clas='part1' type='radio' name='answer' id='o2' value=${config.data[CT].option2} />
                        <label for='o2' class='magpie-response-buttons'>${config.data[CT].option2}</label><br><br><br><br><br>
                    </div>
                    <p id='part2' class='magpie-view-question magpie-nodisplay'><font size = 4 color = "gray">How confident are you of your choice?</font></p>
                    <div id='part2' class='magpie-view-answer-container magpie-nodisplay'>
                        <strong class='magpie-response-rating-option magpie-view-text'>${config.optionLeft}</strong>
                        <label for="1" class='magpie-response-rating'>1</label>
                        <input type="radio" name="answer" id="1" value="1" />
                        <label for="2" class='magpie-response-rating'>2</label>
                        <input type="radio" name="answer" id="2" value="2" />
                        <label for="3" class='magpie-response-rating'>3</label>
                        <input type="radio" name="answer" id="3" value="3" />
                        <label for="4" class='magpie-response-rating'>4</label>
                        <input type="radio" name="answer" id="4" value="4" />
                        <label for="5" class='magpie-response-rating'>5</label>
                        <input type="radio" name="answer" id="5" value="5" />
                        <label for="6" class='magpie-response-rating'>6</label>
                        <input type="radio" name="answer" id="6" value="6" />
                        <label for="7" class='magpie-response-rating'>7</label>
                        <input type="radio" name="answer" id="7" value="7" />
                        <strong class='magpie-response-answer-option magpie-view-text'>${config.optionRight}</strong>
                    </div>
                    <button id="next" class='magpie-view-button magpie-nodisplay'>Next</button>`;
    },

    handle_response_functions: function(config, CT, magpie, answer_container_generator, startingTime) {
        $(".magpie-view").append(answer_container_generator(config, CT));

        $("input[name=answer]").on("change", function() {
            let selected_option_id = $("input[name=answer:checked]").val();
            document.getElementById(selected_option_id).style.border="6px solid black";
            $("#part2").removeClass("magpie-nodisplay");
        });

        $('#o1').on("click", handle_click);
        $('#o2').on("click", handle_click);

        // attaches an event listener to the yes / no radio inputs
        // when an input is selected a response property with a value equal
        // to the answer is added to the trial object
        // as well as a readingTimes property with value
        $("input[name=answer]").on("change", function() {
            $("#next").removeClass("magpie-nodisplay");
        });

        $("#next").on("click", function() {
            const RT = Date.now() - startingTime; // measure RT before anything else
            let trial_data = {
                trial_name: config.name,
                trial_number: CT + 1,
                response: selected_option_id,
                rating: $("input[name=answer]:checked").val(),
                RT: RT
            };

        trial_data = magpieUtils.view.save_config_trial_data(config.data[CT], trial_data);

        magpie.trial_data.push(trial_data);
        magpie.findNextView();
    });
}});*/
// There are many more templates available:
// forced_choice, slider_rating, dropdown_choice, testbox_input, rating_scale, image_selection, sentence_choice,
// key_press, self_paced_reading and self_paced_reading_rating_scale
