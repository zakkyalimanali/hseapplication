from rest_framework import serializers
from .models import Staff , Incident, Attendence , DateList , ToolBoxTalk, Training, SiteHazards , SiteVisit, StaffAdd ,IncidentInvestigation , IncidentFactors, EquipmentAndItems , ItemsPerBox , HSEManagement , HSERefrences, RiskRegister, IncidentPhotos ,JobSafetyAnalysis , JobSafetyEquipment, JobSafetySteps, JobSafetyHazards, IncidentEventPhotos , PermitToWork, HazardsAndPrecautions , PhysicalControls, Signitures , News , Blog ,RiskRegisterProject ,SafetyCard
# from .models import Staff

class StaffSeriallizer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'
    

class IncidentSeriallizer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(IncidentSeriallizer, self).to_representation(instance)
        rep['name'] = instance.raised_by.name
        return rep

class AttendenceSeriallizer(serializers.ModelSerializer):
    class Meta:
        model = Attendence
        fields = '__all__'

class DateListSeriallizer(serializers.ModelSerializer):
    class Meta:
        model = DateList
        fields = '__all__'

class ToolBoxTalkSeriallizer(serializers.ModelSerializer):
    class Meta:
        model = ToolBoxTalk
        fields = '__all__'

#class TrainingSerializer(serializers.ModelSerializer):
    # position = serializers.CharField(source='position.position')
    # class Meta:
    #     model = Training
    #     fields = '__all__'

    # def to_representation(self, instance):
    #     rep = super(TrainingSerializer, self).to_representation(instance)
    #     rep['name'] = instance.staff_name.name
    #     return rep
    
# class TrainingSerializer(serializers.ModelSerializer):
#     staff_position = serializers.SerializerMethodField()

#     class Meta:
#         model = Training
#         fields = '__all__'

#     def get_staff_position(self, obj):
#         staff_position = obj.staff_position
#         if staff_position is not None:
#             return staff_position.position
#         else:
#             return None
    
#     def to_representation(self, instance):
#         rep = super(TrainingSerializer, self).to_representation(instance)
#         rep['name'] = instance.staff_name.name
#         return rep

# class TrainingSerializer(serializers.ModelSerializer):
#     staff_position = serializers.SerializerMethodField()

#     class Meta:
#         model = Training
#         fields = '__all__'

#     def get_staff_position(self, obj):
#         return obj.staff_position.position if obj.staff_position else None    
    
#     def to_representation(self, instance):
#          rep = super(TrainingSerializer, self).to_representation(instance)
#          rep['name'] = instance.staff_name.name
#          return rep

    # def get_staff_position(self, obj):
    #     staff = obj.staff_position
    #     return staff.position if staff is not None else None
    
    # def to_representation(self, instance):
    #     rep = super(TrainingSeriallizer, self).to_representation(instance)
    #     rep['position'] = instance.staff_position.position
    #     return rep

# class TrainingSerializer(serializers.ModelSerializer):
#     staff_position = serializers.SerializerMethodField()

#     class Meta:
#         model = Training
#         fields = '__all__'

#     def get_staff_position(self, obj):
#         return obj.staff_position.position
    
#     def to_representation(self, instance):
#          rep = super(TrainingSerializer, self).to_representation(instance)
#          rep['name'] = instance.staff_name.name
#          return rep
    
# class TrainingSerializer(serializers.ModelSerializer):
#     staff_position = serializers.SerializerMethodField()

#     class Meta:
#         model = Training
#         fields = '__all__'

#     def get_staff_position(self, obj):
#         staff = obj.staff_position
#         return staff.position if staff is not None else None
    
#     def to_representation(self, instance):
#         rep = super(TrainingSerializer, self).to_representation(instance)
#         rep['position'] = instance.staff_position.position
#         return rep

class TrainingSerializer(serializers.ModelSerializer):
    # position = serializers.CharField(source='position.position')
    class Meta:
        model = Training
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(TrainingSerializer, self).to_representation(instance)
        rep['name'] = instance.staff_name.name
        # rep['position'] = instance.staff_position.position
        return rep
 
class SiteVisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteVisit
        fields = '__all__'

class SiteHazardsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteHazards
        fields = '__all__'

class StaffAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffAdd
        fields = '__all__'

class IncidentInvestigationSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentInvestigation
        fields = '__all__'

class IncidentFactorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentFactors
        fields = '__all__'

class EquipmentAndItemsSerializer(serializers.ModelSerializer):
    class Meta: 
        model = EquipmentAndItems
        fields = '__all__'

class ItemsPerBoxSerializer(serializers.ModelSerializer):
    class Meta: 
        model = ItemsPerBox
        fields = '__all__'

class HSEManagementSerializer(serializers.ModelSerializer):
    class Meta: 
        model = HSEManagement
        fields = "__all__"

class HSERefrencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = HSERefrences
        fields = "__all__"

class RiskRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiskRegister
        fields = '__all__'

class IncidentPhotosSerializer(serializers.ModelSerializer):
    class Meta: 
        model = IncidentPhotos
        fields = '__all__'

class JobSafetyAnalysisSerializer(serializers.ModelSerializer):
    class Meta: 
        model = JobSafetyAnalysis
        fields = '__all__'

class JobSafetyEquipmentSerializer(serializers.ModelSerializer):
    class Meta: 
        model = JobSafetyEquipment
        fields = '__all__'

class JobSafetyStepsSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSafetySteps
        fields = '__all__'

class JobSafetyHazardsSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSafetyHazards
        fields = '__all__'

class IncidentEventPhotosSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentEventPhotos
        fields = '__all__'

class PermitToWorkSerializer(serializers.ModelSerializer):
    class Meta: 
        model = PermitToWork
        fields = '__all__'

class HazardsAndPrecautionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = HazardsAndPrecautions
        fields = '__all__'

class PhysicalControlsSeralizer(serializers.ModelSerializer):
    class Meta:
        model = PhysicalControls
        fields = '__all__'

class SignituresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signitures
        fields = '__all__'

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'

class RiskRegisterProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiskRegisterProject
        fields = '__all__'

class SafetyCardSerializer(serializers.ModelSerializer):
    # raised_by = serializers.StringRelatedField(source='raised_by.name')
    name = serializers.CharField(source='raised_by.name', read_only=True)

    class Meta: 
        model = SafetyCard
        fields = '__all__'

    # def to_representation(self, instance):
    #     rep = super(SafetyCardSerializer, self).to_representation(instance)
    #     rep['name'] = instance.raised_by.name
    #     return rep


