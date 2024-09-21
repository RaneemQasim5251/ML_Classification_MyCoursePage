new Vue({
    el: '#app',
    data: {
        currentStep: 0,
        selectedAnswer: null,
        selectedCategory: 'benign',
        numImages: 1,
        hintVisible: false,
        progressPercentage: 0,
        quizOptions: ['خبيث', 'حميد'],
        quizFeedback: '',
        feedbackColor: '',
        currentIndex: 1,
        showCropped: false,
        croppedImageSrc: 'images/datacrop - Copy.png',
        beforeImageSrc: 'images/Y8.jpg',
        afterImageSrc: 'images/Y8_crop.jpg',
        selectedAnswer11: null,
        selectedAnswer2: null,
        selectedAnswer3: null,
        selectedAnswer4: null,
        feedbackColor11: '',
        feedbackColor2: '',
        feedbackColor3: '',
        feedbackColor4: '',
        learningRate: 0.0001,
        epoch: 2,
        testTrainRatio: 20,
        trainingComplete: false,
        validationAccuracy: 0,
        testAccuracy: 0,
        showConfusionMatrixInfo: false,
        selectedImage: null,
        brainTumorImages: [],
        malignantImages: [
            'images/Y246.JPG',
            'images/Y245.JPG',
            'images/Y244.JPG',
            'images/Y243.JPG',
            'images/Y10.JPG'
        ],
        benignImages: [
            'images/no 5.jpeg',
            'images/no 4.jpg',
            'images/no 3.jpg',
            'images/no 2.jpg',
            'images/N2.JPG'
        ],
        interactiveMalignantImages: [
            'img/Image-49.png', 'img/Image-50.png', 'img/Image-51.png',
            'img/Image-56.png', 'img/Image-64.png', 'img/Image-65.png',
            'img/Image-69.png', 'img/Image-76.png', 'img/Image-84.png',
            'img/Image-90.png', 'img/Image-94.png', 'img/Image-102.png',
            'img/Image-111.png', 'img/Image-121.png', 'img/Image-128.png',
            'img/Image-135.png', 'img/Image-143.png', 'img/Image-152.png',
            'img/Image-155.png', 'img/Image-165.png', 'img/Image-175.png',
            'img/Image-182.png'
        ],
        interactiveBenignImages: [
            'img/Image-182.png', 'img1/Image-103.png', 'img1/Image-132.png',
            'img1/Image-148.png', 'img1/Image-161.png', 'img1/Image-171.png',
            'img1/Image-173.png', 'img1/Image-187.png', 'img1/Image-197.png',
            'img1/Image-204.png', 'img1/Image-211.png', 'img1/Image-227.png',
            'img1/Image-241.png', 'img1/Image-258.png', 'img1/Image-279.png',
            'img1/Image-293.png', 'img1/Image-312.png', 'img1/Image-318.png',
            'img/Image-182.png', 'img/Image-182.png', 'img/Image-182.png',
            'img/Image-182.png'
        ],
        predictionMessage: '',
        predictionColor: '',
        showFinalBox: false
    },
    computed: {
        progressCircleStyle() {
            return {
                background: `conic-gradient(red ${this.progressPercentage}%, #ddd 0%)`
            };
        }
    },
    methods: {
        changeStep(step) {
            this.currentStep = step;
            this.progressPercentage = Math.floor(((step + 1) / 13) * 100);
    
            if (step === 5) {
                this.$nextTick(() => {
                    this.plotDataViz();
                });
            }
        },
        selectAnswer(index) {
            this.selectedAnswer = index;
        },
        submitAnswer() {
            if (this.selectedAnswer === 1) {
                this.quizFeedback = 'إجابة صحيحة!';
                this.feedbackColor = 'green';
            } else {
                this.quizFeedback = 'إجابة خاطئة! دعنا نبني النموذج ليتمكن من التنبؤ بسهولة.';
                this.feedbackColor = 'red';
            }
        },
        getVisualizationImageSrc(category, index) {
            if (category === 'malignant') {
                const malignantImages = [
                    'images/Y246.JPG',
                    'images/Y245.JPG',
                    'images/Y244.JPG',
                    'images/Y243.JPG',
                    'images/Y10.JPG'
                ];
                return `${malignantImages[index - 1]}`;
            } else if (category === 'benign') {
                const benignImages = [
                    'images/no 5.jpeg',
                    'images/no 4.jpg',
                    'images/no 3.jpg',
                    'images/no 2.jpg',
                    'images/N2.JPG'
                ];
                return `${benignImages[index - 1]}`;
            }
        },
        getInteractiveImageSrc(category, index) {
            if (category === 'malignant') {
                return this.interactiveMalignantImages[index % this.interactiveMalignantImages.length];
            } else if (category === 'benign') {
                return this.interactiveBenignImages[index % this.interactiveBenignImages.length];
            }
        },
        showHint() {
            this.hintVisible = true;
        },
        hideHint() {
            this.hintVisible = false;
        },
        plotDataViz() {
            const data = [
                {
                    x: ['Train Set', 'Validation Set', 'Test Set'],
                    y: [120, 40, 20],
                    name: 'Yes',
                    type: 'bar',
                    marker: { color: 'orange' }
                },
                {
                    x: ['Train Set', 'Validation Set', 'Test Set'],
                    y: [80, 30, 10],
                    name: 'No',
                    type: 'bar',
                    marker: { color: 'green' }
                }
            ];

            const layout = {
                title: 'Count of classes in each set',
                barmode: 'stack',
                xaxis: { title: 'Set' },
                yaxis: { title: 'Count' }
            };

            Plotly.newPlot('data-viz', data, layout);
        },
        toggleCropped() {
            this.showCropped = !this.showCropped;
        },
        submitQuizAnswer(questionNumber, answer) {
            if (questionNumber === 1) {
                this.selectedAnswer11 = answer;
                this.feedbackColor11 = answer === 'B' ? 'green' : 'red';
            } else if (questionNumber === 2) {
                this.selectedAnswer2 = answer;
                this.feedbackColor2 = answer === 'B' ? 'green' : 'red';
            } else if (questionNumber === 3) {
                this.selectedAnswer3 = answer;
                this.feedbackColor3 = answer === 'B' ? 'green' : 'red';
            } else if (questionNumber === 4) {
                this.selectedAnswer4 = answer;
                this.feedbackColor4 = answer === 'B' ? 'green' : 'red';
            }
        },
        trainModel() {
            this.validationAccuracy = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
            this.testAccuracy = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
            this.trainingComplete = true;
            this.plotConfusionMatrix();
            this.plotAccuracy();
        },
        plotConfusionMatrix() {
            const confusionData = [
                {
                    z: [[50, 10], [8, 32]],
                    x: ['توقع: لا', 'توقع: نعم'],
                    y: ['فعلي: لا', 'فعلي: نعم'],
                    type: 'heatmap',
                    hoverongaps: false
                }
            ];

            const layout = {
                title: 'مصفوفة الارتباك',
                annotations: [],
                xaxis: { title: 'النتيجة المتوقعة' },
                yaxis: { title: 'النتيجة الفعلية' }
            };

            confusionData[0].z.forEach((row, i) => {
                row.forEach((value, j) => {
                    const annotation = {
                        x: confusionData[0].x[j],
                        y: confusionData[0].y[i],
                        text: value,
                        showarrow: false
                    };
                    layout.annotations.push(annotation);
                });
            });

            Plotly.newPlot('confusion-matrix', confusionData, layout);
        },
        plotAccuracy() {
            const trace1 = {
                x: ['التدريب', 'التحقق', 'الاختبار'],
                y: [90, this.validationAccuracy, this.testAccuracy],
                type: 'bar',
                name: 'دقة',
                marker: { color: 'green' }
            };

            const data = [trace1];

            const layout = {
                title: 'دقة النموذج',
                xaxis: { title: 'مجموعة البيانات' },
                yaxis: { title: 'النسبة المئوية للدقة (%)' }
            };

            Plotly.newPlot('accuracy-plot', data, layout);
        },
        testModel() {
            if (this.selectedImage === null) {
                this.predictionMessage = 'الرجاء اختيار صورة أولاً.';
                this.predictionColor = 'red';
                return;
            }
        
            const isMalignant = this.selectedImage < this.malignantImages.length;
            const actual = isMalignant;
            
            // Simulate model accuracy (e.g., 80% accuracy)
            const modelAccuracy = 0.8;
            const prediction = Math.random() < modelAccuracy ? actual : !actual;
        
            if (prediction && actual) {
                this.predictionMessage = '✅ نموذجك تنبأ بورم خبيث، وكانت القيمة الفعلية خبيثة. نجاح: توقع صحيح.';
                this.predictionColor = 'green';
            } else if (!prediction && !actual) {
                this.predictionMessage = '✅ نموذجك تنبأ بورم حميد، وكانت القيمة الفعلية حميدة. نجاح: توقع صحيح.';
                this.predictionColor = 'green';
            } else if (prediction && !actual) {
                this.predictionMessage = '❌ نموذجك تنبأ بورم خبيث، لكن القيمة الفعلية كانت حميدة. فشل: توقع غير صحيح.';
                this.predictionColor = 'red';
            } else {
                this.predictionMessage = '❌ نموذجك تنبأ بورم حميد، لكن القيمة الفعلية كانت خبيثة. فشل: توقع غير صحيح.';
                this.predictionColor = 'red';
            }
        },
        showFinalMessage() {
            this.showFinalBox = true;
        },
        closeFinalMessage() {
            this.showFinalBox = false;
        }
    },
    created() {
        // Combine malignant and benign images
        this.brainTumorImages = [...this.malignantImages, ...this.benignImages];
    },
    mounted() {
        const themeToggleBtn = document.getElementById('theme-toggle');
        const body = document.body;

        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
        });
    }
});