// Define study
const study = lab.util.fromObject({
  "messageHandlers": {},
  "title": "root",
  "type": "lab.flow.Sequence",
  "plugins": [
    {
      "type": "lab.plugins.Metadata",
      "path": undefined
    },
    {
      "type": "lab.plugins.Transmit",
      "url": "backend.php",
      "path": undefined
    }
  ],
  "metadata": {
    "title": "lab.js template study",
    "description": "a template for how to structure your study",
    "repository": "https:\u002F\u002Fgithub.com\u002FFelixHenninger\u002Flab.js\u002Ftree\u002Fmaster\u002Ftasks",
    "contributors": "Felix Henninger \u003Cmailbox@felixhenninger.com\u003E (http:\u002F\u002Ffelixhenninger.com)"
  },
  "parameters": {},
  "files": {},
  "responses": {},
  "content": [
    {
      "type": "lab.html.Screen",
      "files": {},
      "parameters": {},
      "responses": {},
      "messageHandlers": {},
      "title": "Preview Screen",
      "content": "\u003Cheader\u003E\n  \u003Ch1\u003EPlease accept the hit in order to work on it!\u003C\u002Fh1\u003E\n\u003C\u002Fheader\u003E\n\u003Cmain class=\"content-horizontal-center content-vertical-center\"\u003E\n  \u003Cdiv class=\"w-m\"\u003E\n    \u003Cdiv class=\"alert text-center\"\u003E\n      \u003Cp\u003E\n       In this study you will be listening to words and sentences over your headphones. This study will take up to 25 minutes and must be completed in a quiet location while wearing \u003Cstrong\u003E headphones \u003C\u002Fstrong\u003E.\n      \u003C\u002Fp\u003E\n      \u003Cp\u003E If you'd like to participate, please \u003Cstrong\u003EACCEPT\u003Cstrong\u003E this hit first.\n      \u003C\u002Fp\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E\n\u003Cfooter class=\"content-horizontal-right\"\u003E\n\u003C\u002Ffooter\u003E",
      "skip": "${ this.parameters.condition != \"preview\" } "
    },
    {
      "type": "lab.canvas.Screen",
      "content": [],
      "viewport": [
        800,
        600
      ],
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {
        "run": function anonymous(
) {
function anonymous(
          ) {
          const transmitPlugins = this.parents[0].plugins.plugins
            .filter(p => p instanceof lab.plugins.Transmit)

          if (transmitPlugins.length > 0) {
            // If a transmitPlugin is available,
            // pull out its options and transfer the data
            const ds = this.options.datastore
            const tp = transmitPlugins[0]
            console.log(tp)
            ds.transmit(
              tp.url,
              { ...tp.metadata, payload: 'full' },
              { headers: tp.headers, encoding: tp.encoding },
            ).then(
              () => this.end('transmission successful')
            ).catch(
              () => this.end('transmission failed')
            )
          } else if ('jatos' in window) {
            // If JATOS is available, send data there
            jatos.submitResultData(
              this.options.datastore.exportJson(),
              () => this.end('transmission successful'),
              () => this.end('transmission failed')
            )
          } else {
            console.log('no compatible backend')
            this.end('no compatible backend')
          }
        }
  
}
      },
      "title": "Session-plugin",
      "skip": true
    },
    {
      "type": "lab.html.Screen",
      "files": {},
      "parameters": {},
      "responses": {},
      "messageHandlers": {},
      "title": "Repeat Check",
      "content": "\u003Cheader\u003E\n  \u003Ch1\u003ESorry!\u003C\u002Fh1\u003E\n\u003C\u002Fheader\u003E\n\u003Cmain class=\"content-horizontal-center content-vertical-center\"\u003E\n  \u003Cdiv class=\"w-m\"\u003E\n    \u003Cdiv class=\"alert alert-danger text-center\"\u003E\n      \u003Cp\u003E\n        It looks like you've already taken part in this experiment! You can only participate in this experiment once. However, please feel free to see our other studies that you may be eligible to take part in\n      \u003C\u002Fp\u003E\n      \u003Cp class=\"font-weight-bold\" \u003E If you believe this is an error please contact us at \u003Ca href=\"mailto:leap-lab@psych.rutgers.edu\" target=\"_top\"\u003Eleap-lab@psych.rutgers.edu\u003C\u002Fa\u003E\n      \u003C\u002Fp\u003E\n    \u003C\u002Fdiv\u003E\n    \u003Cp\u003E\n      We are very sorry, but \u003Cstrong\u003Eyou cannot continue\u003C\u002Fstrong\u003E\u003Cbr\u003E\n      with this study. \n\n    \u003C\u002Fp\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E\n\u003Cfooter class=\"content-horizontal-right\"\u003E\n\u003C\u002Ffooter\u003E",
      "skip": "${ this.parameters.condition != \"repeat\" }"
    },
    {
      "type": "lab.html.Screen",
      "files": {},
      "responses": {
        "click button": "continue"
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "Study Introduction",
      "content": "  \u003Cheader\u003E\n    \u003Ch2\u003E Introduction \u003C\u002Fh2\u003E\n  \u003C\u002Fheader\u003E\n  \n  \u003Cmain class=\"content-horizontal-center content-vertical-center\"\u003E\n      \u003Cdiv class=\"w-m text-justify\"\u003E\n        \u003Cdiv class=\"alert w-100 text-center\"\u003E\n          \u003Cp class=\"font-weight-bold\"\u003E\n          Thank you for choosing this study! \n          \u003C\u002Fp\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Cp\u003E\n          \\INSERT STUDY DESCRIPTION HERE\\\n        \u003C\u002Fp\u003E\n        \u003Cp\u003E\n          First, please look over our consent document. Make sure to read it carefullly. \n        \u003C\u002Fp\u003E\n\n        \u003Cp\u003E \u003Ca href = \"consent.pdf\" target = \"_blank\" \u003Econsent document \u003C\u002Fa\u003E \u003C\u002Fp\u003E\n        \u003Cp\u003E Once you have read over the consent document, please press \"continue\" below. \n        \u003C\u002Fp\u003E\n        \u003Cp\u003E \u003Cstrong\u003E By pressing continue, you are indicating that you have read the consent document and consent to participate in this study.\u003C\u002Fstrong\u003E \u003C\u002Fp\u003E\n        \u003Cp\u003E  Press continue to begin the study \u003C\u002Fp\u003E\n        \u003Cp\u003E \u003Cbutton id = \"continue\"\u003EContinue &rarr;\u003C\u002Fbutton\u003E \u003C\u002Fp\u003E\n      \u003C\u002Fdiv\u003E\n  \u003C\u002Fmain\u003E\n"
    },
    {
      "title": "Headphone screening",
      "type": "lab.flow.Sequence",
      "parameters": {},
      "plugins": [],
      "metadata": {
        "title": "Headphone screening",
        "description": "This study implements the headphone screening procedure as described by Woods et al. (2017).\n\nWoods, K. J., Siegel, M. H., Traer, J., & McDermott, J. H. (2017). Headphone screening to facilitate web-based auditory experiments. Attention, Perception, & Psychophysics, 79(7), 2064–2072.",
        "repository": "",
        "contributors": "Felix Henninger"
      },
      "files": {},
      "responses": {},
      "content": [
        {
          "type": "lab.html.Screen",
          "files": {},
          "parameters": {},
          "responses": {
            "click button": "continue"
          },
          "messageHandlers": {},
          "title": "Introduction",
          "content": "\u003Cheader\u003E\n  \u003Ch2\u003ESound calibration\u003C\u002Fh2\u003E\n\u003C\u002Fheader\u003E\n\u003Cmain class=\"content-horizontal-center content-vertical-center\"\u003E\n  \u003Cdiv class=\"w-m\"\u003E\n    \u003Cdiv class=\"alert w-100\"\u003E\n      \u003Cp class=\"font-weight-bold\"\u003E\n        You \u003Cem\u003Emust\u003C\u002Fem\u003E wear headphones\u003Cbr\u003E\n        during this study!\n      \u003C\u002Fp\u003E\n      \u003Cp\u003E\n        If you are not already wearing headphones,\u003Cbr\u003E\n        please put some on before continuing.\n      \u003C\u002Fp\u003E\n    \u003C\u002Fdiv\u003E\n    \u003Cp\u003E\n      Click below after you have fitted your headphones\u003Cbr\u003E\n      to start the calibration.\n    \u003C\u002Fp\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E\n\u003Cfooter class=\"content-horizontal-right\"\u003E\n  \u003Cbutton id=\"continue\"\u003EContinue &rarr;\u003C\u002Fbutton\u003E\n\u003C\u002Ffooter\u003E"
        },
        {
          "type": "lab.html.Screen",
          "files": {
            "noise_calib_stim.wav": "embedded\u002Fd46823570e5c1dd1a6cfbe1f9688c06d98a3d203fae63579866669a5070f658a.wav"
          },
          "parameters": {},
          "responses": {
            "click button": "continue"
          },
          "messageHandlers": {
            "before:prepare": function anonymous(
) {
this.internals.calibrationClip = new Audio()
this.internals.calibrationClip.src = this.files['noise_calib_stim.wav']
this.internals.calibrationClip.load()

this.options.events['click a'] = function(e) {
  e.preventDefault()
  this.internals.calibrationClip.play()
}
},
            "end": function anonymous(
) {
delete this.internals.calibrationClip
}
          },
          "title": "Volume calibration",
          "content": "\u003Cheader\u003E\n  \u003Ch2\u003ESound calibration\u003C\u002Fh2\u003E\n\u003C\u002Fheader\u003E\n\u003Cmain class=\"content-horizontal-center content-vertical-center\"\u003E\n  \u003Cdiv class=\"w-m text-justify\"\u003E\n    \u003Cdiv class=\"alert w-100 text-center\"\u003E\n      \u003Cp class=\"font-weight-bold\"\u003E\n        We will now calibrate\u003Cbr\u003E\n        the volume of your headphones.\n      \u003C\u002Fp\u003E\n    \u003C\u002Fdiv\u003E\n    \u003Cp\u003E\n      Please take through the following steps to calibrate your headphones:\n    \u003C\u002Fp\u003E\n    \u003Col\u003E\n      \u003Cli\u003E\u003Cstrong\u003ESet your computer volume to about 25%\u003C\u002Fstrong\u003E of its maximum level.\u003C\u002Fli\u003E\n      \u003Cli\u003E\u003Ca href=\"#\"\u003EClick here\u003C\u002Fa\u003E to listen to a calibration sound. \u003Cstrong\u003ETurn up the volume on your computer until the calibration sound is at a loud but comfortable level.\u003C\u002Fstrong\u003E You can listen to it as many times as you like.\u003C\u002Fli\u003E\n    \u003C\u002Fol\u003E\n    \u003Cp\u003EClick below once you have set the computer volume to a loud but comfortable level\u003C\u002Fp\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E\n\u003Cfooter class=\"content-horizontal-right\"\u003E\n  \u003Cbutton id=\"continue\"\u003EContinue &rarr;\u003C\u002Fbutton\u003E\n\u003C\u002Ffooter\u003E"
        },
        {
          "type": "lab.html.Screen",
          "files": {},
          "parameters": {},
          "responses": {
            "click button": "continue"
          },
          "messageHandlers": {},
          "title": "Task instructions",
          "content": "\u003Cheader\u003E\n  \u003Ch2\u003ESound calibration\u003C\u002Fh2\u003E\n\u003C\u002Fheader\u003E\n\u003Cmain class=\"content-horizontal-center content-vertical-center\"\u003E\n  \u003Cdiv class=\"w-m text-justify\"\u003E\n    \u003Cp\u003E\n      In the following, you will hear several sequences of three sounds each, separated by silence. \u003Cstrong\u003EYour task is to judge which of these was the softest or quietest.\u003C\u002Fstrong\u003E\n    \u003C\u002Fp\u003E\n    \u003Cp\u003E\n      We will ask you for your judgement after each sequence of three sounds. \u003Cstrong\u003EThe sounds will only be played once\u003C\u002Fstrong\u003E, so please pay close attention.\n    \u003C\u002Fp\u003E\n    \u003Cp\u003E\n      Click below to start the task.\n    \u003C\u002Fp\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E\n\u003Cfooter class=\"content-horizontal-right\"\u003E\n  \u003Cbutton id=\"continue\"\u003EContinue &rarr;\u003C\u002Fbutton\u003E\n\u003C\u002Ffooter\u003E"
        },
        {
          "type": "lab.flow.Loop",
          "files": {},
          "parameters": {},
          "templateParameters": [
            {
              "stimulus_1": "I",
              "stimulus_2": "O",
              "stimulus_3": "S",
              "position_correct": "3"
            },
            {
              "stimulus_1": "I",
              "stimulus_2": "S",
              "stimulus_3": "O",
              "position_correct": "2"
            },
            {
              "stimulus_1": "O",
              "stimulus_2": "I",
              "stimulus_3": "S",
              "position_correct": "3"
            },
            {
              "stimulus_1": "O",
              "stimulus_2": "S",
              "stimulus_3": "I",
              "position_correct": "2"
            },
            {
              "stimulus_1": "S",
              "stimulus_2": "I",
              "stimulus_3": "O",
              "position_correct": "1"
            },
            {
              "stimulus_1": "S",
              "stimulus_2": "O",
              "stimulus_3": "I",
              "position_correct": "1"
            }
          ],
          "sample": {
            "mode": "draw-shuffle"
          },
          "responses": {},
          "messageHandlers": {
            "end": function anonymous(
) {
// Extract responses from datastore
const ds = this.options.datastore
const responses = ds.extract('correct', 'Judgement')

// Compute performance
const performance = lab.util.stats.mean(responses)

// Save performance into state
this.state.headphone_check_performance = performance
}
          },
          "title": "Task",
          "shuffleGroups": [],
          "template": {
            "type": "lab.flow.Sequence",
            "files": {},
            "parameters": {},
            "responses": {},
            "messageHandlers": {},
            "title": "Trial",
            "content": [
              {
                "type": "lab.html.Screen",
                "files": {
                  "S.wav": "embedded\u002F028a1d214738284c2af746286761be2513583775fd94ee768f4592fe7fe3dd86.wav",
                  "O.wav": "embedded\u002F1d317eeb5dc3f6d57c4afa06a7991908425d44ac2a22545fb232c0d547b609ff.wav",
                  "I.wav": "embedded\u002F59f37bf5e01e9d7383c0b9faead69751eba7e22d25d357a0db00a0c32e4f58be.wav"
                },
                "parameters": {},
                "responses": {},
                "messageHandlers": {},
                "viewport": [
                  800,
                  600
                ],
                "title": "Sounds",
                "timeline": [
                  {
                    "type": "sound",
                    "start": 0,
                    "stop": 1000,
                    "priority": 0,
                    "payload": {
                      "gain": 1,
                      "pan": 0,
                      "rampUp": 0,
                      "rampDown": 0,
                      "src": "${ this.files[this.parameters.stimulus_1 + \".wav\"] }"
                    }
                  },
                  {
                    "type": "sound",
                    "start": 1500,
                    "stop": 2500,
                    "priority": 1,
                    "payload": {
                      "gain": 1,
                      "pan": 0,
                      "rampUp": 0,
                      "rampDown": 0,
                      "src": "${ this.files[this.parameters.stimulus_2 + \".wav\"] }"
                    }
                  },
                  {
                    "type": "sound",
                    "start": 3000,
                    "stop": 4000,
                    "priority": 2,
                    "payload": {
                      "gain": 1,
                      "pan": 0,
                      "rampUp": 0,
                      "rampDown": 0,
                      "src": "${ this.files[this.parameters.stimulus_3 + \".wav\"] }"
                    }
                  }
                ],
                "timeout": "4250",
                "content": "\u003Cmain class=\"content-horizontal-center content-vertical-center\"\u003E\n  \u003Cdiv\u003E\n    \u003Cp class=\"font-weight-bold\"\u003E\n      Please listen carefully\u003Cbr\u003E\n      to the sounds\n    \u003C\u002Fp\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E\n\u003Cfooter class=\"content-horizontal-center content-vertical-center\"\u003E\n  The study will progress automatically\n\u003C\u002Ffooter\u003E"
              },
              {
                "type": "lab.html.Screen",
                "files": {},
                "parameters": {},
                "responses": {
                  "click #choice-1": "1",
                  "click #choice-2": "2",
                  "click #choice-3": "3"
                },
                "messageHandlers": {},
                "title": "Judgement",
                "content": "\u003Cmain class=\"content-horizontal-center content-vertical-center\"\u003E\n  \u003Cdiv\u003E\n    \u003Cp class=\"font-weight-bold\"\u003EWhich of the three sounds was the softest (quietest)?\u003C\u002Fp\u003E\n    \u003Cdiv\u003E\n      \u003Cbutton\n        id=\"choice-1\"\n        style=\"\n          font-size: 64px;\n          width: 140px;\n          height: 150px;\n          border-radius: 6px;\n          margin: 12px;\n        \"\n      \u003E\n        1\n      \u003C\u002Fbutton\u003E\n      \u003Cbutton\n        id=\"choice-2\"\n        style=\"\n          font-size: 64px;\n          width: 140px;\n          height: 150px;\n          border-radius: 6px;\n          margin: 12px;\n        \"\n      \u003E\n        2\n      \u003C\u002Fbutton\u003E\n      \u003Cbutton\n        id=\"choice-3\"\n        style=\"\n          font-size: 64px;\n          width: 140px;\n          height: 150px;\n          border-radius: 6px;\n          margin: 12px;\n        \"\n      \u003E\n        3\n      \u003C\u002Fbutton\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E\n\u003Cfooter class=\"content-horizontal-center content-vertical-center\"\u003E\n  Please make your choice by clicking on one of the buttons.\n\u003C\u002Ffooter\u003E",
                "correctResponse": "${ this.parameters.position_correct }"
              }
            ]
          }
        },
        {
          "type": "lab.html.Screen",
          "files": {},
          "parameters": {},
          "responses": {},
          "messageHandlers": {},
          "title": "Trap",
          "tardy": true,
          "content": "\u003Cheader\u003E\n  \u003Ch2\u003ESorry!\u003C\u002Fh2\u003E\n\u003C\u002Fheader\u003E\n\u003Cmain class=\"content-horizontal-center content-vertical-center\"\u003E\n  \u003Cdiv class=\"w-m\"\u003E\n    \u003Cdiv class=\"alert alert-danger text-center\"\u003E\n      \u003Cp class=\"font-weight-bold\"\u003E\n        Your system does not provide the audio fidelity required to complete this study.\n      \u003C\u002Fp\u003E\n    \u003C\u002Fdiv\u003E\n    \u003Cp\u003E\n      We are very sorry, but \u003Cstrong\u003Eyou cannot continue\u003C\u002Fstrong\u003E\u003Cbr\u003E\n      with this study.\n    \u003C\u002Fp\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E\n\u003Cfooter class=\"content-horizontal-right\"\u003E\n\u003C\u002Ffooter\u003E",
          "skip": "${ this.state.headphone_check_performance \u003E 2\u002F3 }"
        },
        {
          "type": "lab.html.Screen",
          "files": {},
          "parameters": {},
          "responses": {
            "click button": "continue"
          },
          "messageHandlers": {},
          "title": "Thanks",
          "content": "\u003Cheader\u003E\n  \u003Ch2\u003EThank you!\u003C\u002Fh2\u003E\n\u003C\u002Fheader\u003E\n\u003Cmain class=\"content-horizontal-center content-vertical-center\"\u003E\n  \u003Cdiv class=\"w-m\"\u003E\n    \u003Cdiv class=\"alert text-center\"\u003E\n      \u003Cp class=\"font-weight-bold\"\u003E\n        You have successfully completed\u003Cbr\u003E\n        the calibration task.\n      \u003C\u002Fp\u003E\n    \u003C\u002Fdiv\u003E\n    \u003Cp\u003E\n      Please click below to continue with the study.\n    \u003C\u002Fp\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E\n\u003Cfooter class=\"content-horizontal-right\"\u003E\n  \u003Cbutton id=\"continue\"\u003EContinue &rarr;\u003C\u002Fbutton\u003E\n\u003C\u002Ffooter\u003E"
        }
      ]
    },
    {
      "type": "lab.canvas.Screen",
      "content": [],
      "viewport": [
        800,
        600
      ],
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Status:started",
      "skip": true
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "i-text",
          "left": 0,
          "top": 0,
          "angle": 0,
          "width": 408.95,
          "height": 36.16,
          "stroke": null,
          "strokeWidth": 1,
          "fill": "black",
          "text": "YOUR STUDY GOES HERE",
          "fontStyle": "normal",
          "fontWeight": "normal",
          "fontSize": 32,
          "fontFamily": "sans-serif",
          "lineHeight": 1.16,
          "textAlign": "center"
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "INSERT-STUDY",
      "timeout": "1000"
    },
    {
      "type": "lab.html.Form",
      "content": "\u003Cform\u003E\n      \u003Chtml\u003E\n        \u003Cdiv class=\"container\"\u003E\n          \u003Cmain\u003E\n            \n              \u003Cheader\u003ELearning, Adaptation, and Perception Lab Questionnaire\u003C\u002Fheader\u003E\n\n              \u003Ch4\u003EThanks for working on this task!\u003C\u002Fh4\u003E\n            \n            \u003Cdiv align = \"left\"\u003E\n              \u003Cp\u003EThis is an optional questionnaire. Answering this questionnaire will not affect your participation in this study, nor will it affect your payment for participation in this study. You may answer some of these questions, all of these questions, or none of these questions. The questions are designed for one of two things:\u003C\u002Fp\u003E\n                  \u003Col\u003E\n                    \u003Cli\u003EProvide us with information that will better help us conduct the experiment and analyze the data from the experiment.\u003C\u002Fli\u003E\n                  \u003Cli\u003EProvide us with information regarding participant demographics (age, race, sex, etc.) that is often requested by groups monitoring and\u002For funding our research. This information is requested by groups such as the National Science Foundation (NSF), the National Institute of Health (NIH), and the university's Institutional Review Board (IRB) to ensure that human research studies accurately sample the population base of the region. This also helps to make sure that certain population subsets are no longer wittingly or unwittingly underrepresented in scientific research data.\u003C\u002Fli\u003E\n                \u003C\u002Fol\u003E\n                \u003Cp\u003EIf after you complete and submit this questionnaire you later decide that you wish to amend or erase any information you supplied us, please let us know at \u003Cstrong\u003Eleap-lab@psych.rutgers.edu\u003C\u002Fstrong\u003E, as you are always free to make changes to this info.\u003C\u002Fp\u003E\n            \u003C\u002Fdiv\u003E\n        \u003C\u002Fmain\u003E\n\n        \u003Cbody\u003E\n\n          \u003Cform\u003E\n\n            \u003Cdiv id=\"endForm\" class=\"survey\"\u003E\n              \u003Col\u003E\n                  \u003Cli\u003E How were you playing the audio in this study? \n                    \u003Cselect id=\"audioequip\" name=\"audioequip\"\u003E\n                        \u003Coption\u003EIn-ear headphones\u002Fearbuds (cost $30 or less)\u003C\u002Foption\u003E\n                        \u003Coption\u003EIn-ear headphones\u002Fearbuds (cost $100 or less)\u003C\u002Foption\u003E\n                        \u003Coption\u003EIn-ear headphones\u002Fearbuds (cost more than $100)\u003C\u002Foption\u003E\n                        \u003Coption\u003EOver-the-ear headphones (cost $30 or less)\u003C\u002Foption\u003E\n                        \u003Coption\u003EOver-the-ear headphones (cost $100 or less)\u003C\u002Foption\u003E\n                        \u003Coption\u003EOver-the-ear headphones (cost more than $100)\u003C\u002Foption\u003E\n                    \u003C\u002Fselect\u003E\n                  \u003C\u002Fli\u003E\n\n                  \u003Cli\u003E Age \n                    \u003CtextArea id=\"age\" name=\"age\" placeholder=\"Enter your age here.\" \u003E\u003C\u002FtextArea\u003E\n                  \u003C\u002Fli\u003E\n                  \u003Cli\u003E Sex \n                    \u003Cselect id = \"sex\" name=\"sex\"\u003E\n                      \u003Coption value=\"NA\" selected\u003EOther (non-binary, agender, etc)\u003C\u002Foption\u003E\n                      \u003Coption value=\"Female\"\u003EFemale\u003C\u002Foption\u003E\n                      \u003Coption value=\"Male\"\u003EMale\u003C\u002Foption\u003E\n                  \u003C\u002Fselect\u003E\n                  \u003C\u002Fli\u003E\n\n                  \u003Cli\u003E Ethnicity \n                    \u003Cselect name=\"ethnicity\"\u003E\n                      \u003Coption value=\"NA\" selected\u003EN\u002FA\u003C\u002Foption\u003E\n                      \u003Coption value=\"Hisp\"\u003EHispanic or Latinx\u002FLatine\u003C\u002Foption\u003E\n                      \u003Coption value=\"NonHisp\"\u003ENot Hispanic or Latinx\u002FLatine\u003C\u002Foption\u003E\n                    \u003C\u002Fselect\u003E\n                  \u003C\u002Fli\u003E\n\n                  \u003Cli\u003E Race \n                      \u003Cul\u003E\n                    \u003Cli\u003E\u003Cinput type=\"checkbox\" name=\"race\" value=\"amerind;\"\u003EAmerican Indian \u002F Alaska Native\u003C\u002Finput\u003E\u003C\u002Fli\u003E\n                    \u003Cli\u003E\u003Cinput type=\"checkbox\" name=\"race\" value=\"black;\"\u003EBlack or African-American\u003C\u002Finput\u003E\u003C\u002Fli\u003E\n                    \u003Cli\u003E\u003Cinput type=\"checkbox\" name=\"race\" value=\"pacif;\"\u003ENative Hawaiian or Other Pacific Islander\u003C\u002Finput\u003E\u003C\u002Fli\u003E\n                    \u003Cli\u003E\u003Cinput type=\"checkbox\" name=\"race\" value=\"asian;\"\u003EAsian\u003C\u002Finput\u003E\u003C\u002Fli\u003E\n                    \u003Cli\u003E\u003Cinput type=\"checkbox\" name=\"race\" value=\"white;\"\u003EWhite\u003C\u002Finput\u003E\u003C\u002Fli\u003E\n                    \u003Cli\u003E\u003Cinput type=\"checkbox\" name=\"race\" value=\"unknown;\"\u003EUnknown\u003C\u002Finput\u003E\u003C\u002Fli\u003E\n                    \u003Cli\u003E\u003Cinput type=\"checkbox\" name=\"race\" value=\"other;\"\u003EOther\u003C\u002Finput\u003E\u003C\u002Fli\u003E\n                    If Other:\n                      \u003Cinput type=\"text\" name=\"raceother\"\u002F\u003E\n                    \u003C\u002Ful\u003E\n                  \u003C\u002Fli\u003E\n\n                  \u003Cli\u003E Were you born in the USA? \n                    \u003Cselect id=\"where_born\" name=\"born\"\u003E\n                      \u003Coption\u003Eno\u003C\u002Foption\u003E\n                      \u003Coption\u003Eyes\u003C\u002Foption\u003E\n                      \u003Coption\u003Eprefer not to answer\u003C\u002Foption\u003E\n                    \u003C\u002Fselect\u003E\n                  \u003C\u002Fli\u003E\n\n                  \u003Cli\u003E Did all of your parents speak Engish at home growing up? \n                    \u003Cselect id=\"parent_english\" name=\"parent\"\u003E\n                      \u003Coption\u003Eno\u003C\u002Foption\u003E\n                        \u003Coption\u003Eyes\u003C\u002Foption\u003E\n                        \u003Coption\u003Eprefer not to answer\u003C\u002Foption\u003E\n                    \u003C\u002Fselect\u003E\n                  \u003C\u002Fli\u003E\n\n                  \u003Cli\u003E(optional) if not, what languages did they speak?\n                    \u003CtextArea id=\"parent_lang\" name=\"lang\" placeholder=\"Enter language here.\"\u003E \u003C\u002FtextArea\u003E\n                  \u003C\u002Fli\u003E\n\n                  \u003Cli\u003E Enter any comments you have below.  Did anything seem weird? Were you hearing anything besides the choices we gave you? \n                    \u003CtextArea id=\"comments\" name=\"comments\" placeholder=\"Enter your comments here.\"\u003E \u003C\u002FtextArea\u003E\n                  \u003C\u002Fli\u003E\n                \u003C\u002Fol\u003E\n                \u003Cfooter align = \"center\"\u003E\n                 \u003Cp\u003E Press submit to submit your answers to the survey \u003C\u002Fp\u003E\n                \u003Cbutton type=\"submit\"\u003E Submit \u003C\u002Fbutton\u003E\n                \u003C\u002Ffooter\u003E\n              \u003C\u002Fdiv\u003E\n            \u003C\u002Fform\u003E\n          \u003C\u002Fbody\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fhtml\u003E  \n  \u003C\u002Fform\u003E\n",
      "files": {},
      "parameters": {},
      "responses": {},
      "messageHandlers": {},
      "title": "Quesionnaire Form"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [],
      "viewport": [
        800,
        600
      ],
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Status:submitted",
      "skip": true
    },
    {
      "type": "lab.html.Screen",
      "files": {},
      "parameters": {},
      "responses": {},
      "messageHandlers": {
        "before:prepare": function anonymous(
) {
function getQueryVariable(variable){
          let query = new URLSearchParams(location.search);
          let value = query.get(variable);
          return value;}

console.log("filling form fields")

var aid = getQueryVariable("assignmentId");
var wid = getQueryVariable("workerId");

this.parameters.turkSubmitTo = getQueryVariable("turkSubmitTo");

this.parameters.assignmentId = aid;
this.parameters.workerId = wid;

}
      },
      "title": "Submit HIT",
      "content": "\u003Cmain class=\"content-horizontal-center content-vertical-center\"\u003E\n    \u003Chtml\u003E\n        \u003Cdiv class=\"w-m text-justify\"\u003E\n           \u003Cdiv class=\"alert w-100 text-center\"\u003E\n             \u003Chead\u003ELearning, Adaptation, and Perception Lab\u003C\u002Fhead\u003E\n\n              \u003Ch4\u003EThanks for working on this task!\u003C\u002Fh4\u003E    \n              \u003Cbody\u003E\n                \u003Cform id='mturk_form' action= '${this.parameters.turkSubmitTo}'method='post'\u003E\n                  \u003Cinput type='hidden' name='assignmentId' id='assignmentId' value='${this.parameters.assignmentId}' \u003E\n                  \u003Cinput type='hidden' name='workerId' id='workerId' value='${this.parameters.workerId}' \u003E\n\n                  \u003Cp\u003E Press the \"submit\" button to submit this assigment to Mechanical Turk! \u003C\u002Fp\u003E\n                     \u003Cbutton type=\"submit\"\u003E Finish HIT! \u003C\u002Fbutton\u003E\n                 \u003C\u002Fform\u003E\n              \u003C\u002Fbody\u003E\n          \u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fhtml\u003E  \n\u003C\u002Fmain\u003E"
    }
  ]
})

// Let's go!
study.run()