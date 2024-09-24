package aphamale.project.appointment.Service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import aphamale.project.appointment.Domain.HospitalInfoDomain;
import aphamale.project.appointment.Dto.CustomAdminUserDetails;
import aphamale.project.appointment.Repository.HospitalInfoRepository;

@Service
public class CustomAdminUserDetailService implements UserDetailsService {

    private final HospitalInfoRepository hospitalInfoRepository;

    public CustomAdminUserDetailService(HospitalInfoRepository hospitalInfoRepository){

        this.hospitalInfoRepository = hospitalInfoRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException{

        HospitalInfoDomain hospitalInfoDomain = hospitalInfoRepository.findByHospitalId(userId).orElseThrow(() -> new UsernameNotFoundException(userId));  // (throw new UsernameNotFoundException(userId));

        //if(hospitalInfoDomain != null){

            return new CustomAdminUserDetails(hospitalInfoDomain);
        //}      
        
        
    }

    
}