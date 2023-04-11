from rest_framework import serializers
from .models import Staff , Incident, Attendence , DateList , ToolBoxTalk
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