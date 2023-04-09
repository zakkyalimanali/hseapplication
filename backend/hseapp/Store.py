class schProfileForm(ModelForm):
    error_css_class = 'error-field'
    required_css_class = 'required-field'
    class Meta:
        model = SchoolingProfile
        # fields = ['school_name', 'education_level', 'academic_programme', 'enrollment_status', 'year_start', 'year_end', 'sen_iep', 'remark']
        fields = '__all__'
        # exclude = ['student',]
        widgets = {
            'student': forms.HiddenInput(),
            'year_start': forms.DateInput(attrs={'type': 'date', 'max': datetime.now().date()}),
            'year_end': forms.DateInput(attrs={'type': 'date', 'max': datetime.now().date()}),  
            'remark': forms.Textarea(attrs={'rows':3}),
            'sen_iep': forms.widgets.CheckboxInput(attrs={'class': 'checkbox-inline'}),
            'scouts': forms.widgets.CheckboxInput(attrs={'class': 'checkbox-inline'}),
            'girl_guides' : forms.widgets.CheckboxInput(attrs={'class': 'checkbox-inline'}),
            'police_cadets' : forms.widgets.CheckboxInput(attrs={'class': 'checkbox-inline'}),
            'girl_guides' : forms.widgets.CheckboxInput(attrs={'class': 'checkbox-inline'}),
            'red_crescent_society_fire_and_rescue' : forms.widgets.CheckboxInput(attrs={'class': 'checkbox-inline'}),
            'persatuan_sukarelawan_institusi_pendidikan' : forms.widgets.CheckboxInput(attrs={'class': 'checkbox-inline'}),
            'sitting_psr' : forms.widgets.CheckboxInput(attrs={'class': 'checkbox-inline'}),
            'sitting_igcse' : forms.widgets.CheckboxInput(attrs={'class': 'checkbox-inline'}),
            'sitting_o_level' : forms.widgets.CheckboxInput(attrs={'class': 'checkbox-inline'}),
            'sitting_a_level' : forms.widgets.CheckboxInput(attrs={'class': 'checkbox-inline'}),
            'diploma_aliyah_qiraat' : forms.widgets.CheckboxInput(attrs={'class': 'checkbox-inline'}),
            'academic_club_member' : forms.widgets.CheckboxInput(attrs={'class': 'checkbox-inline'}),
            'nonacademic_club_member' : forms.widgets.CheckboxInput(attrs={'class': 'checkbox-inline'}),


        }
    fieldset= ['school_time','homeroom_name', 'school_name', 'education_level', 'academic_programme', 'enrollment_status','year_start', 'year_end', 'remark']
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fieldset:
            new_field = field.replace('_',' ')   #prepping placeholder, replace '_' 
            # print(field)
            new_data = {
                "placeholder": f'{str(new_field)}',             #loop placeholder
                "class": 'form-control form-control-sm'
            }
            self.fields[str(field)].widget.attrs.update(new_data)

