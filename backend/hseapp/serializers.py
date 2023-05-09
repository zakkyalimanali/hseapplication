from rest_framework import serializers
from .models import Staff , Incident, Attendence , DateList , ToolBoxTalk, Training, SiteHazards , SiteVisit, StaffAdd
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